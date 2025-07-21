import { useEffect, useState } from 'react';
import { apiRequest } from './api';
import { useNavigate } from 'react-router-dom';

export default function ProductGallery() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/products');
            setProducts(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Products</h2>
            {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col cursor-pointer hover:shadow-2xl border border-gray-100 transition-shadow" onClick={() => navigate(`/product/${product._id}`)}>
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                            <h3 className="text-lg font-bold text-green-800 mb-1">{product.name}</h3>
                            <div className="text-gray-700 mb-1">Ksh {product.price}</div>
                            <div className="text-gray-500 mb-1">{product.category}</div>
                            <div className="text-gray-500 mb-2">{product.description.slice(0, 60)}...</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 