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

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h3>Report an Issue</h3>
      <input 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="text"
        placeholder="Contact Information"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default ReportForm;