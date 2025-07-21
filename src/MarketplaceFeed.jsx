import { useEffect, useState } from 'react';
import { apiRequest } from './api';
import { useNavigate } from 'react-router-dom';
// import ContactForm from './ContactForm'; // Remove

const categories = ['All', 'Crops', 'Livestock', 'Services', 'Tools/Inputs'];

export default function MarketplaceFeed() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const [contactProduct, setContactProduct] = useState(null); // Remove

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [category, search]);

    const fetchProducts = async () => {
        setLoading(true); setError(null);
        try {
            let query = '';
            if (category !== 'All') query += `category=${category}&`;
            if (search) query += `search=${encodeURIComponent(search)}`;
            const res = await apiRequest(`/products?${query}`);
            setProducts(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`px-4 py-1 rounded-full border font-semibold transition-colors ${category === cat ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-green-50'}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {loading && <div className="text-center py-8">Loading...</div>}
            {error && <div className="text-center text-red-600 py-4">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow-lg p-5 flex flex-col cursor-pointer hover:shadow-2xl border border-gray-100 transition-shadow"
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-green-800 truncate">{product.title}</h3>
                            {product.isVerified && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Verified</span>}
                        </div>
                        <div className="text-gray-700 mb-2 line-clamp-2">{product.description}</div>
                        <div className="flex-1" />
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-green-700">Ksh {product.price}</span>
                            <span className="text-xs text-gray-500">{product.category}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{product.location}</div>
                        {/* Removed Contact Admin button */}
                    </div>
                ))}
            </div>
            {/* Removed ContactForm usage */}
            {!loading && products.length === 0 && <div className="text-center py-8 text-gray-500">No products found.</div>}
        </div>
    );
} 