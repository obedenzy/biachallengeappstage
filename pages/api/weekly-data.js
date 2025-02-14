import { createClient } from '@supabase/supabase-js';
import { calculateRawScore, generateWeekDropdownOptions, getQueryDates } from '../../lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { weekLabel } = req.query;

    if (!weekLabel) {
      return res.status(400).json({ error: 'Week label is required' });
    }
    const weeks = generateWeekDropdownOptions();

    const queryDates = getQueryDates(weekLabel, weeks);

    if (!queryDates) {
        return res.status(400).json({ error: 'Invalid week label' });
    }

    try {
      const { startDate, endDate } = queryDates;
      const endDateWithTime = `${endDate}T23:59:59.999Z`;

      const { data, error } = await supabase
        .from('biaformtable')
        .select('*')
        .gte('created_at', startDate)
        .lte('created_at', endDateWithTime);

      if (error) {
        throw error;
      }

      // Group data by full_name (case-insensitive)
      const groupedData = {};
      data.forEach((entry) => {
        const lowerCaseName = entry.full_name.toLowerCase();
        if (!groupedData[lowerCaseName]) {
          groupedData[lowerCaseName] = {
            entries: [],
            originalName: entry.full_name,
          };
        }
        groupedData[lowerCaseName].entries.push(entry);
      });

      // Find the selected week number
      const selectedWeekData = weeks.find((week) => week.label === weekLabel);
      const selectedWeekNumber = selectedWeekData ? selectedWeekData.weekNumber : null;

      // Calculate total raw score and divide by appropriate divisor
      const averagedData = [];
      for (const lowerCaseName in groupedData) {
        const { entries, originalName } = groupedData[lowerCaseName];
        let totalRawScore = 0;
        entries.forEach((entry) => {
          totalRawScore += calculateRawScore(entry); // Sum raw scores
        });

        let divisor = 49; // Default divisor for Week 2 and beyond
        if (selectedWeekNumber === 5) {
          divisor = 56; // Divisor for Week 1
        }

        let averageScore = (totalRawScore / divisor) * 100;
        if (averageScore > 100) {
            averageScore = 100;
        }
        averagedData.push({
          full_name: originalName, // Use original name for display
          average_score: averageScore,
          num_entries: entries.length,
        });
      }

        // Sort the data alphabetically by full name
        const sortedData = averagedData.sort((a, b) => a.full_name.localeCompare(b.full_name));

      res.status(200).json(sortedData);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
      res.status(500).json({ error: 'Error fetching weekly data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
