import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { selectedFullName, answers } = req.body;

    if (!selectedFullName) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (Object.values(answers).some(answer => answer === '')) {
        return res.status(400).json({ error: 'All questions must be answered' });
    }


    const today = new Date().toISOString().split('T')[0];

    try {
      // Check for existing record (case-insensitive for full_name)
      const { data: existingRecords, error: existingError } = await supabase
        .from('biaformtable')
        .select('id')
        .eq('full_name', selectedFullName)
        .gte('created_at', today);

      if (existingError) {
        throw existingError;
      }

      const mappedData = {
        full_name: selectedFullName,
        hydration_goals: answers.hydrationGoals,
        diet_nutrition: answers.dietNutrition,
        study_read: answers.studyRead,
        daily_progress_photo: answers.dailyProgressPhoto,
        mindfulness_practice: answers.mindfulnessPractice,
        abstinence: answers.abstinence,
        connection_networking: answers.connectionNetworking,
      };

      if (existingRecords && existingRecords.length > 0) {
        // Update existing record
        const existingRecordId = existingRecords[0].id;
        const { error: updateError } = await supabase
          .from('biaformtable')
          .update(mappedData)
          .eq('id', existingRecordId);

        if (updateError) {
          throw updateError;
        }
        res.status(200).json({ message: 'Record updated successfully' });
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('biaformtable')
          .insert([mappedData]);

        if (insertError) {
          throw insertError;
        }
        res.status(201).json({ message: 'Record inserted successfully' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ error: 'Error submitting form' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
