import { startOfWeek, endOfWeek, addWeeks, format, getWeek } from 'date-fns';

// Helper function for basic date formatting for labels (e.g., "Feb 1")
export const formatDateForLabel = (date) => {
    return format(date, 'MMM d');
};

// Function to generate week options for the dropdown
export const generateWeekDropdownOptions = () => {
    const startDate = new Date('2025-02-01T00:00:00.000Z'); // Start date: Feb 1st, 2025
    const today = new Date(); // Current date
    const generatedWeeks = [];

    // Find the start of the week (Sunday) for the start date
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 }); // 0 represents Sunday
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 0 });

    while (currentWeekStart <= currentWeekEnd) {
        const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 });
        const weekNumber = getWeek(currentWeekStart, { weekStartsOn: 0 }); // Get week number
        const displayWeekNumber = weekNumber >= 5 ? weekNumber - 5 : weekNumber; // Adjust for display
        const weekLabel = `Week ${displayWeekNumber} - ${formatDateForLabel(currentWeekStart)} to ${formatDateForLabel(weekEnd)}`;

        generatedWeeks.push({
            label: weekLabel,
            weekNumber: weekNumber, //store the original week number
            displayWeekNumber: displayWeekNumber,
            startDate: currentWeekStart,
            endDate: weekEnd,
        });

        currentWeekStart = addWeeks(currentWeekStart, 1); // Move to the next week
    }
    return generatedWeeks;
};

// Helper function to format dates for database queries (YYYY-MM-DD)
export const formatDateForQuery = (date) => {
    return format(date, 'yyyy-MM-dd');
};

// Function to get query dates (start and end) from a week label
export const getQueryDates = (weekLabel, weeks) => {
    const weekData = weeks.find((week) => week.label === weekLabel);
    if (!weekData) {
        return null; // Or handle the error appropriately
    }
    return {
        startDate: formatDateForQuery(weekData.startDate),
        endDate: formatDateForQuery(weekData.endDate),
    };
};

// Calculate the *raw* score (number of "yes" answers) for a single day's entry
export const calculateRawScore = (participant) => {
    let score = 0;
    if (participant.hydration_goals === 'yes') score++;
    if (participant.diet_nutrition === 'yes') score++;
    if (participant.study_read === 'yes') score++;
    if (participant.daily_progress_photo === 'yes') score++;
    if (participant.mindfulness_practice === 'yes') score++;
    if (participant.abstinence === 'yes') score++;
    if (participant.connection_networking === 'yes') score++;
    return score;
};

export const cityGroups = [
    'Atlanta, GA',
    'Austin, TX',
    'Baltimore/DC',
    'Boston (New England)',
    'Chicago, IL',
    'Cincinnati, OH',
    'Cleveland, OH',
    'Columbus, OH',
    'Conneticut / West Mass.',
    'Dallas/Ft. Worth',
    'Denver, CO',
    'Detroit, MI',
    'Fort Myers/Cape Coral, FL',
    'Honolulu, HI',
    'Houston, TX',
    'Hunstville, AL',
    'Indianapolis, IN',
    'Jacksonville, FL',
    'Kansas City, MO',
    'Las Vegas, NV',
    'Lexington, KY',
    'Los Angeles, CA',
    'Miami/West Palm Beach, FL',
    'Milwaukee, WI',
    'Nashville, TN',
    'New York City, NY',
    'North Carolina',
    'Oklahoma',
    'Orlando, FL',
    'Philadelphia, PA',
    'Phoenix, AZ',
    'Pittsburgh, PA',
    'Richmond, VA',
    'San Antonio, TX',
    'San Diego, CA',
    'San Francisco/San Jose, CA',
    'Seattle, WA',
    'South Carolina',
    'St. Louis, MO',
    'Tampa, FL',
    'West Virginia'
];

export const priorities = [
    'Weight Loss',
    'Mental Health/Mindset',
    'Healthy Mindful Eating',
    'Working Out/Movement',
    'Discipline/Consistency/Sustainability'
];
