import { useState } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from './api';

export default function Profile() {
    const { user, token } = useAuth();
    const [qualifications, setQualifications] = useState(user?.qualifications?.join('\n') || '');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!user || (user.role !== 'Vet' && user.role !== 'Service Provider')) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-center">
                    <h2 className="text-2xl font-bold mb-4">Profile</h2>
                    <p className="text-red-600">Only Vets and Service Providers can update qualifications.</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError(null); setSuccess(false);
        try {
            await apiRequest('/users/profile', 'PUT', {
                qualifications: qualifications.split('\n').map(q => q.trim()).filter(Boolean)
            }, token);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center">Update Qualifications</h2>
                {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
                {success && <div className="mb-2 text-green-600 text-center">Qualifications updated!</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Qualifications (one per line)</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={5}
                            value={qualifications}
                            onChange={e => setQualifications(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
} 