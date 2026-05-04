import { useState } from 'react';

const ReportForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      title,
      description,
      location,
      name,
      contact,
      status: 'Pending'
    };
    onSubmit(newReport);
    setTitle('');
    setDescription('');
    setLocation('');
    setName('');
    setContact('');
  };

  const inputClass = "px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition";

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
      <h3 className="text-sm font-medium text-stone-800 mb-4">Report an Issue</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-500">Issue Title</label>
          <input
            type="text"
            placeholder="e.g Pothole on Main Street"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            required
          />
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
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Submit Report
          </button>
        </div>
  </form>
    </div>
  );
}

export default ReportForm;