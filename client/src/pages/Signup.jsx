import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../buttons/BackButton';
import backgroundImage from '../images/background-img.jpg';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError('');

        try {
            const res = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(typeof data.error === 'string' ? data.error : data.error?.message || "Signup failed");
                return;
            }

            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            setError('Server error. Please try again.');
        }
    };

    return (
  <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative bg-cover bg-center w-full min-h-screen">
    <div className="min-h-screen w-full bg-black/50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <BackButton />
        
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded bg-green-600" />
            <span className="text-sm font-medium text-stone-800">CivicFix</span>
          </div>

          <h1 className="text-base font-medium text-stone-800">Create Account</h1>
          <p className="text-sm text-stone-500 mb-6">Join our community today!</p>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">Name</label>
              <input className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">Email</label>
              <input className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">Password</label>
              <input className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500">Confirm Password</label>
              <input className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <button type="submit" className="w-full py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </form>

          <p className="text-xs text-stone-400 text-center mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:text-green-600">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Signup;