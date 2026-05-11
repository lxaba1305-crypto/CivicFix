import supabase from '../config/supabaseClient.js';

export const getReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('SUPABASE ERROR:', error);

      return res.status(400).json({
        error: error.message,
      });
    }

    res.json(data);
  } catch (err) {
    console.log('SERVER ERROR:', err);

    res.status(500).json({
      error: err.message,
    });
  }
};