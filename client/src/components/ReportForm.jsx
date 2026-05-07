import { useState } from 'react';
import { supabase } from '../supabaseClient';

const ReportForm = ({ onSubmit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newReport = {
      category,
      description,
      location,
      full_name: name,
      email,
      status: 'pending'
    };

    const { data, error } = await supabase
    .from('Reports')
    .insert([newReport])
    .select()

    setLoading(false);

    if (error) {
      console.log(error);
      alert('Failed to submit report');
      return;
    }

    console.log(data);

    alert('Report submitted successfully');

    setCategory('');
    setDescription('');
    setLocation('');
    setName('');
    setEmail('');
  };

  const inputClass = "px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition";

  return (
    <div className="w-full bg-white border border-stone-200 rounded-xl p-6 mb-6">
      <h3 className="text-sm font-medium text-stone-800 mb-4">Report an Issue</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Issue Type</label>
          <select
            type="text"
            placeholder="e.g Pothole on Main Street"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Select issue</option>
            <option value="Roads">Roads (Potholes, cracks)</option>
            <option value="Drainage">Drainage (Blocked pipes, flooding)</option>
            <option value="Electricity">Electricity (Streetlights, cables)</option>
            <option value="Waste">Waste Management (Bins, dumping)</option>
            <option value="Water">Water Issues (Leaks, outages)</option>
            <option value="Safety">Safety Hazards</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Description</label>
          <textarea
            placeholder="Describe the issue you're reporting..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass + " resize-none h-24"}
            required
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Location</label>
          <input
            type="text"
            placeholder="e.g Main Street and 5th Avenue"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Your Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Contact Email</label>
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
  </form>
    </div>
  );
}

export default ReportForm;