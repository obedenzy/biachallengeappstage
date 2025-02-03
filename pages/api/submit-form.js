import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    export default async function handler(req, res) {
      if (req.method === 'POST') {
        const formData = req.body;

        if (formData.formType === 'registration') {
          // Handle registration form submission
          const { error } = await supabase.from('participants').insert([
            {
              full_name: formData.fullName,
              city_group: formData.cityGroup,
              top_priority: formData.priority,
              personal_goal: formData.personalGoal,
              leader_interest: formData.leaderInterest,
            },
          ]);

          if (error) {
            console.error('Error inserting registration data:', error);
            return res.status(500).json({ error: 'Error inserting registration data' });
          } else {
            console.log('Registration data inserted successfully');
            return res.status(200).json({ message: 'Registration successful' });
          }
        } else if (formData.formType === 'daily') {
          // Handle daily form submission
          const today = new Date().toISOString().split('T')[0];

          const { data: existingRecords, error: existingError } = await supabase
            .from('biaformtable')
            .select('id')
            .eq('full_name', formData.full_name)
            .gte('created_at', today);

          if (existingError) {
            console.error('Error checking for existing record:', existingError);
            return res.status(500).json({ error: 'Error checking for existing record' });
          }

          if (existingRecords && existingRecords.length > 0) {
            const existingRecordId = existingRecords[0].id;
            const { error: updateError } = await supabase
              .from('biaformtable')
              .update(formData)
              .eq('id', existingRecordId);

            if (updateError) {
              console.error('Error updating record:', updateError);
              return res.status(500).json({ error: 'Error updating record' });
            } else {
              console.log('Record updated successfully');
              return res.status(200).json({ message: 'Record updated successfully' });
            }
          } else {
            const { error: insertError } = await supabase
              .from('biaformtable')
              .insert([formData]);

            if (insertError) {
              console.error('Error inserting record:', insertError);
              return res.status(500).json({ error: 'Error inserting record' });
            } else {
              console.log('Record inserted successfully');
              return res.status(200).json({ message: 'Record inserted successfully' });
            }
          }
        } else {
          return res.status(400).json({ error: 'Invalid form type' });
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
