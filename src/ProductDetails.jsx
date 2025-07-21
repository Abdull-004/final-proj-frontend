import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from './api';
import { useCart } from './CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest(`/products/${id}`);
            setProduct(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
    if (!product) return <div className="text-center py-8">Product not found.</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h2>
            <div className="text-lg text-gray-700 mb-2">Ksh {product.price}</div>
            <div className="mb-2">Category: <span className="text-gray-700">{product.category}</span></div>
            <div className="mb-2">Stock: <span className="text-gray-700">{product.stock}</span></div>
            <div className="mb-4 text-gray-700">{product.description}</div>
            <button
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 font-semibold"
                onClick={() => { addToCart(product); setAdded(true); }}
                disabled={added}
            >
                {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
} 