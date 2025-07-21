import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from './api';

const CLOUDINARY_UPLOAD_PRESET = 'market-hub-unsigned';
const CLOUDINARY_CLOUD_NAME = 'dwtxstchf';

export default function AdminDashboard() {
    const { user, token } = useAuth();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState({ name: '', image: '', price: '', description: '', category: '', location: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [tab, setTab] = useState('products');

    // Fetch products
    useEffect(() => {
        if (tab === 'products') fetchProducts();
        if (tab === 'orders') fetchOrders();
        // eslint-disable-next-line
    }, [tab]);

    const fetchProducts = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/products', 'GET');
            setProducts(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const fetchOrders = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/orders', 'GET', null, token);
            setOrders(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setError(null);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                setForm(f => ({ ...f, image: data.secure_url }));
                setSuccess(true);
            } else {
                setError('Image upload failed.');
            }
        } catch (err) {
            setError('Image upload failed.');
        }
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true); setError(null); setSuccess(false);
        try {
            if (editingId) {
                await apiRequest(`/products/${editingId}`, 'PUT', form, token);
                setSuccess(true);
                setEditingId(null);
            } else {
                await apiRequest('/products', 'POST', form, token);
                setSuccess(true);
            }
            setForm({ name: '', image: '', price: '', description: '', category: '', location: '' });
            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setForm({
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            category: product.category,
            location: product.location,
        });
        setError(null);
        setSuccess(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        setLoading(true); setError(null);
        try {
            await apiRequest(`/products/${id}`, 'DELETE', null, token);
            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    if (!user || !user.isAdmin) {
        return <div className="text-center py-8 text-red-600">Access denied. Admins only.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex gap-4 mb-6">
                <button onClick={() => setTab('products')} className={`px-4 py-2 rounded font-semibold ${tab === 'products' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}>Products</button>
                <button onClick={() => setTab('orders')} className={`px-4 py-2 rounded font-semibold ${tab === 'orders' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}>Orders</button>
            </div>
            {tab === 'products' && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                    {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
                    {success && <div className="mb-2 text-green-600 text-center">{editingId ? 'Product updated!' : 'Product added!'}</div>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input type="text" name="name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Image</label>
                            <input type="file" accept="image/*" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleImageChange} />
                            {form.image && <img src={form.image} alt="Preview" className="w-20 h-20 rounded mt-2 object-cover border-2 border-green-700" />}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input type="number" name="price" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" value={form.price} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <input type="text" name="category" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" value={form.category} onChange={handleChange} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea name="description" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" value={form.description} onChange={handleChange} required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium">Location</label>
                            <input type="text" name="location" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" value={form.location} onChange={handleChange} />
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 font-semibold" disabled={loading}>
                                {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update' : 'Add')}
                            </button>
                            {editingId && (
                                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-semibold" onClick={() => { setEditingId(null); setForm({ name: '', image: '', price: '', description: '', category: '', location: '' }); setError(null); setSuccess(false); }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
            {tab === 'orders' && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-green-800">Orders</h2>
                    {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
                        <div className="space-y-6">
                            {orders.length === 0 ? <div className="text-gray-500">No orders yet.</div> : orders.map(order => (
                                <div key={order._id} className="bg-white rounded shadow p-4 border border-gray-100">
                                    <div className="font-bold text-lg mb-2">Order #{order._id.slice(-6).toUpperCase()}</div>
                                    <div className="mb-2 flex gap-4 items-center">
                                        <span className="font-semibold">Status:</span>
                                        <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">{order.status}</span>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {order.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                                        </span>
                                    </div>
                                    <div className="mb-2"><span className="font-semibold">Customer:</span> {order.customerName} ({order.customerEmail}, {order.customerPhone})</div>
                                    <div className="mb-2"><span className="font-semibold">Address:</span> {order.customerAddress}</div>
                                    <div className="mb-2 font-semibold">Items:</div>
                                    <ul className="ml-4 list-disc">
                                        {order.items.map(item => (
                                            <li key={item.product} className="flex items-center gap-2 mb-1">
                                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                                <span>{item.name}</span> x <span>{item.quantity}</span> @ Ksh {item.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-2 text-right font-bold">Total: Ksh {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</div>
                                    <div className="text-xs text-gray-400 mt-1">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 