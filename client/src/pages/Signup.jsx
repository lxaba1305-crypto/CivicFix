import {useState} from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError('');
}

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm bg-white border border-stone-200 rounded-xl p-8">
        
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded bg-green-600" />
                            <span className="text-sm font-medium text-stone-800">CivicFix</span>
                        </div>
        
                        <h1 className="text-base font-medium text-stone-800 ">Create Account</h1>
                        <p className="text-sm text-stone-500 mb-6">Join our community today!</p>
        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-stone-500">Name</label>
                                <input
                                    className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-stone-500">Email</label>
                                <input
                                    className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-stone-500">Password</label>
                                <input
                                    className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-stone-500">Confirm Password</label>
                                <input
                                    className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                Sign Up
                            </button>
                        </form>
                        
                        <p className="text-xs text-stone-400 text-center mt-5">
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-500 hover:text-green-600">
                                Log in
                            </Link>
                        </p>
                 {error && (
  <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
    {error}
  </p>
)}
                    </div>
                </div>
    );
}

export default Signup;