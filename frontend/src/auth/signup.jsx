import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('api/auth/register/', { name, email, password });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error signing up:', error.response?.data);
            const detail = error.response?.data?.detail
                || error.response?.data?.email?.[0]
                || error.response?.data?.password?.[0]
                || "Something went wrong. Please try again.";
            setError(detail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-teal-600/6 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-10 no-underline group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                        <span className="text-white font-bold text-xl">✦</span>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                        Magic<span className="text-teal-400">Todo</span>
                    </span>
                </Link>

                {/* Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-8 shadow-2xl shadow-black/20">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
                        <p className="text-slate-400 text-sm">Start organizing your life like magic</p>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-300 mb-2">
                                Full name
                            </label>
                            <input
                                type="text"
                                id="signup-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm outline-none transition-all duration-300 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 hover:border-slate-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="signup-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm outline-none transition-all duration-300 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 hover:border-slate-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="signup-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 text-sm outline-none transition-all duration-300 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 hover:border-slate-600"
                            />
                            <p className="mt-1.5 text-xs text-slate-500">Must be at least 8 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:from-teal-500 hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-teal-400 font-medium hover:text-teal-300 transition-colors no-underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-slate-600 text-xs mt-6">
                    By signing up, you agree to our Terms of Service
                </p>
            </div>
        </div>
    );
};

export default Signup;
