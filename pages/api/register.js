import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullName, cityGroup, priority, personalGoal, leaderInterest } = req.body;

        if (!fullName || !cityGroup || !priority || !personalGoal) {
            return res.status(400).json({ error: 'Please fill in all required fields.' });
        }

        try {
            const { data, error } = await supabase.from('participants').insert([
                {
                    full_name: fullName,
                    city_group: cityGroup,
                    top_priority: priority,
                    personal_goal: personalGoal,
                    leader_interest: leaderInterest
                }
            ]);

            if (error) {
                throw error;
            }

            res.status(201).json({ message: 'Registration successful', data });

        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Failed to register. Please try again.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
