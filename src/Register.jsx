import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from './api';

export default function Register() {
    const [role, setRole] = useState('customer');
    const [form, setForm] = useState({ name: '', email: '', password: '', shopName: '', shopDescription: '', location: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true); setError(null);
        try {
            await apiRequest('/auth/register', 'POST', { ...form, role });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Register as</label>
                    <select name="role" value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded px-3 py-2">
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                </div>
                {role === 'seller' && (
                    <>
                        <div>
                            <label className="block mb-1 font-medium">Shop Name</label>
                            <input name="shopName" value={form.shopName} onChange={handleChange} required={role === 'seller'} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Shop Description</label>
                            <textarea name="shopDescription" value={form.shopDescription} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                        </div>
                    </>
                )}
                <div>
                    <label className="block mb-1 font-medium">Location (optional)</label>
                    <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="w-full bg-green-700 text-white py-2 rounded font-semibold" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                {success && <div className="text-green-700 text-center mt-2">Registration successful! Redirecting...</div>}
            </form>
            <div className="text-center mt-4 text-sm">
                Already have an account? <span className="text-green-700 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
            </div>
        </div>
    );
}