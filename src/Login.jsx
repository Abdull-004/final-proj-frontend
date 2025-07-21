import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login() {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await login(email, password);
        setSuccess(ok);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
                {success && <div className="mb-2 text-green-600 text-center">Login successful!</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
} 