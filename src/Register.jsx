import { useState } from 'react';
import { useAuth } from './AuthContext';

const roles = ['Farmer', 'Buyer', 'Vet', 'Service Provider'];

export default function Register() {
    const { register, loading, error: backendError } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        location: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Name is required";
        if (!form.email.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
        if (!form.password) return "Password is required";
        if (form.password.length < 6) return "Password must be at least 6 characters";
        if (!form.role) return "Please select a role";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const ok = await register(form);
        if (ok) {
            setSuccess(true);
            setError(null);
        } else if (backendError) {
            setError(backendError);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Register</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-2 bg-green-50 text-green-600 rounded text-center">
                        Registration successful! You can now login.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.password}
                            onChange={handleChange}
                            minLength="6"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="">Select your role</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.location}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded font-semibold text-white ${loading ? 'bg-gray-400' : 'bg-green-700 hover:bg-green-800'}`}
                    >
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}