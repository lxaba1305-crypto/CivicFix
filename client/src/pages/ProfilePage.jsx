import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../buttons/BackButton";

function ProfilePage() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    const [form, setForm] = useState({
        name: storedUser.name || '',
        email: storedUser.email || '',
        street: '',
        suburb: '',
        city: '',
        phone: '',
        bio: '',
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const extras = JSON.parse(localStorage.getItem('userProfile') || '{}');
        setForm(prev => ({ ...prev, ...extras }));
    }, []);
    
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        localStorage.setItem('userProfile', JSON.stringify(form));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputClass = "px-4 py-2.5 border border-green-200 rounded-xl bg-green-50/50 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition";

    return (
        <div className="max-w-2xl mx-auto px-6 py-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <BackButton />
            <div className="mt-6 bg-white border border-green-100 rounded-3xl p-8 shadow-sm">

            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white text-2xl font-bold flex items-center justify-center shadow-md">
                    {form.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-green-900">{form.name || 'Your Name'}</h1>
                    <p className="text-sm text-green-700">{form.email}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-green-800">Full Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Your full name"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-green-800">Phone Number</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="e.g. +27 83 456 7890"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-green-800">Street Address</label>
                    <input
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. 123 Main Street"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-green-800">Suburb</label>
                        <input
                            name="suburb"
                            value={form.suburb}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="e.g. Sandton"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-green-800">City</label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="e.g. Johannesburg"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-green-800">Bio / About</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className={`${inputClass} resize-none h-20`}
                        placeholder="Tell us a bit about yourself..."
                    />
                </div>

                {saved && (
                    <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                        ✅ Profile saved!
                    </p>
                )}

                <button onClick={handleSave} className="w-full py-2.5 text-sm font-semibold bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-xl hover:scale-[1.01] hover:shadow-lg transition duration-299">
                    Save Profile
                </button>
            </div>
        </div>
        </div>
        
    )
}

export default ProfilePage;