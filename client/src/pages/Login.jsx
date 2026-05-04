import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white border border-stone-200 rounded-xl p-8">

                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded bg-green-600" />
                    <span className="text-sm font-medium text-stone-800">RoadAlert</span>
                </div>

                <h1 className="text-base font-medium text-stone-800 ">Welcome Back</h1>
                <p className="text-sm text-stone-500 mb-6">Please login to your account</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-stone-500">Email or Phone Number</label>
                        <input
                            className="px-3 py-2 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"
                            type="email"
                            placeholder="Email or Phone Number"
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
                    <button type="submit" className="w-full py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Sign In
                    </button>
                </form>
                
                <p className="text-xs text-stone-400 text-center mt-5">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-green-500 hover:text-green-600">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;