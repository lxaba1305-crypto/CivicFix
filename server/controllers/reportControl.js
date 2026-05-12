import supabase from '../config/supabaseClient.js';

export const getReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { category, description, location, full_name, email, user_id } = req.body;

    const { data, error } = await supabase
      .from('Reports')
      .insert([{ category, description, location, full_name, email, status: 'pending' }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { status } = req.body;

    const { data, error } = await supabase
      .from('Reports')
      .update({ status })
      .eq('id', req.params.id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { error } = await supabase
      .from('Reports')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};