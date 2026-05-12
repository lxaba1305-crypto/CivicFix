import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../buttons/BackButton";
import WelcomeScreen from "./WelcomeScreen";
import backgroundImage from '../images/background-img.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Login failed");
            setLoading(false);
            return;
        }

        console.log("LOGGED IN USER:", data.user);

        localStorage.setItem('user', JSON.stringify(data.user));
        
        setTimeout(() => {

          if (data.user.role === 'admin') {
              navigate('/admin');
          } else {
              navigate('/dashboard');
          }
        }, 2200);

      } catch (err) {
        console.log(err);
        setError("Server error. Please try again.");
        setLoading(false);
    }
  };

    

    return (
      <>
      {loading && (
        <WelcomeScreen onFinish={() => {}} />
      )}
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="relative bg-cover bg-center w-full min-h-screen">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

                <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4">

                    <div className="w-full max-w-sm">

                        <BackButton />

                        <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl">

                            {/* LOGO AREA */}

                            <div className="flex items-center gap-2 mb-6">

                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                                <span className="text-sm font-semibold text-green-900 tracking-wide">

                                    CivicFix

                                </span>

                            </div>

                            {/* TITLE */}

                            <h1 className="text-2xl font-bold text-stone-800">

                                Welcome Back

                            </h1>

                            <p className="text-sm text-stone-500 mt-1 mb-6">

                                Please login to your account

                            </p>

                            {/* FORM */}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                {/* EMAIL */}

                                <div className="flex flex-col gap-1">

                                    <label className="text-xs font-medium text-stone-500">

                                        Email Address

                                    </label>

                                    <input

                                        className="px-3 py-2.5 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

                                        type="email"

                                        placeholder="Enter your email"

                                        value={email}

                                        onChange={(e) => setEmail(e.target.value)}

                                        required

                                    />

                                </div>

                                {/* PASSWORD */}

                                <div className="flex flex-col gap-1">

                                    <label className="text-xs font-medium text-stone-500">

                                        Password

                                    </label>

                                    <input

                                        className="px-3 py-2.5 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition"

                                        type="password"

                                        placeholder="Enter your password"

                                        value={password}

                                        onChange={(e) => setPassword(e.target.value)}

                                        required

                                    />

                                </div>

                                {/* ERROR */}

                                {error && (

                                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">

                                        {error}

                                    </p>

                                )}

                                {/* BUTTON */}

                                <button

                                    type="submit"

                                    disabled={loading}

                                    className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:scale-[1.01] hover:shadow-lg hover:shadow-green-500/20 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"

                                >

                                    {loading ? 'Signing In...' : 'Sign In'}

                                </button>

                            </form>

                            {/* SIGNUP LINK */}

                            <p className="text-xs text-stone-400 text-center mt-5">

                                Don't have an account?{' '}

                                <Link

                                    to="/signup"

                                    className="text-green-600 hover:text-green-700 font-medium transition"

                                >

                                    Sign up

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Login;