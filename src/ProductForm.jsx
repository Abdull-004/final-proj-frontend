import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from './api';
import { useAuth } from './AuthContext';

const categories = ['Crops', 'Livestock', 'Services', 'Tools/Inputs'];

export default function ProductForm({ editMode = false }) {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', price: '', description: '', category: '', images: [], location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Restrict access to Farmers only
    if (!user || user.role !== 'Farmer') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200 text-center">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p className="text-red-600">Only Farmers can create or edit products.</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (editMode && id) {
            fetchProduct();
        }
        // eslint-disable-next-line
    }, [editMode, id]);

    const fetchProduct = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest(`/products/${id}`);
            setForm({
                title: res.title,
                price: res.price,
                description: res.description,
                category: res.category,
                images: res.images || [],
                location: res.location,
            });
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true); setError(null); setSuccess(false);
        try {
            if (editMode) {
                await apiRequest(`/products/${id}`, 'PUT', form, token);
                setSuccess(true);
                setError(null);
                setTimeout(() => navigate(`/product/${id}`), 1000);
            } else {
                const res = await apiRequest('/products', 'POST', form, token);
                setSuccess(true);
                setError(null);
                setTimeout(() => navigate(`/product/${res._id}`), 1000);
            }
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center">{editMode ? 'Edit Listing' : 'Create Listing'}</h2>
                {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
                {success && <div className="mb-2 text-green-600 text-center">{editMode ? 'Product updated!' : 'Product created!'}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            name="category"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Image upload can be added here in the future */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 font-semibold"
                        disabled={loading}
                    >
                        {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update' : 'Create')}
                    </button>
                </form>
            </div>
        </div>
    );
} 