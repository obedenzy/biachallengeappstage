import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    export default async function handler(req, res) {
      if (req.method === 'GET') {
        try {
          const { data, error } = await supabase
            .from('participants')
            .select('full_name');

          if (error) {
            console.error('Error fetching names:', error);
            return res.status(500).json({ error: 'Error fetching names' });
          }

          const uniqueSortedNames = [
            ...new Set(data.map((record) => record.full_name).sort((a, b) => a.localeCompare(b))),
          ];

          res.status(200).json(uniqueSortedNames);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
