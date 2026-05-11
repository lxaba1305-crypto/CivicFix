import { useState } from 'react';

const ReportForm = ({ onSubmit, onClose }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const newReport = {
      title: category,
      category,
      description,
      location,
      full_name: name,
      status: 'pending'
    };

    try {
      const response = await fetch('http://localhost:5000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReport)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit report');
        setLoading(false);
        return;
      }

      alert('Report submitted successfully');

      setCategory('');
      setDescription('');
      setLocation('');
      setName('');
      setEmail('');
      setError('');

      if (onSubmit) onSubmit(data);
      if (onClose) onClose();
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition";

  return (
    <div className="w-full bg-white border border-stone-200 rounded-xl p-6 mb-6">
      <h3 className="text-sm font-medium text-stone-800 mb-4">Report an Issue</h3>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Issue Type</label>
          <select
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
          <label className="text-xs font-medium text-stone-500">What is the issue?</label>
          <textarea
            placeholder="Describe the problem in detail..."
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
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-400 transition"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
  </form>
    </div>
  );
}

export default ReportForm;