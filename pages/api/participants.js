import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('full_name');

      if (error) {
        throw error;
      }

      // Sort and remove duplicates
      const uniqueSortedNames = [
        ...new Set(data.map((record) => record.full_name).sort((a, b) => a.localeCompare(b))),
      ];


      res.status(200).json(uniqueSortedNames);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching participants' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
