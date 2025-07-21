import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from './api';
import { useAuth } from './AuthContext';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionMsg, setActionMsg] = useState(null);

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

    const handleDelete = async () => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await apiRequest(`/products/${id}`, 'DELETE', null, token);
            setActionMsg('Product deleted.');
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setActionMsg(err.message);
        }
    };

    const handleVerify = async (verify) => {
        try {
            await apiRequest(`/products/${id}/${verify ? 'verify' : 'unverify'}`, 'PATCH', null, token);
            setActionMsg(verify ? 'Product verified.' : 'Product unverified.');
            fetchProduct();
        } catch (err) {
            setActionMsg(err.message);
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
    if (!product) return null;

    const isOwner = user && user.id === product.user._id;
    const isAdmin = user && user.role === 'Admin';

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-green-800">{product.title}</h2>
                {product.isVerified && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Verified</span>}
            </div>
            <div className="mb-2 text-gray-700 text-lg">{product.description}</div>
            <div className="mb-2">Price: <span className="font-semibold text-green-700">Ksh {product.price}</span></div>
            <div className="mb-2">Category: <span className="text-gray-700">{product.category}</span></div>
            <div className="mb-2">Location: <span className="text-gray-700">{product.location}</span></div>
            <div className="mb-2">Seller: <span className="text-gray-700">{product.user.name} ({product.user.role})</span></div>
            {/* Images could be shown here if available */}
            <div className="flex gap-2 mt-4">
                {user && !isOwner && (
                    <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={() => navigate(`/messages?with=${product.user._id}&product=${product._id}`)}>
                        Message Seller
                    </button>
                )}
                {isOwner && (
                    <>
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700" onClick={() => navigate(`/edit-product/${id}`)}>Edit</button>
                        <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 ml-2" onClick={handleDelete}>Delete</button>
                    </>
                )}
                {isAdmin && (
                    <>
                        {product.isVerified ? (
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2" onClick={() => handleVerify(false)}>Unverify</button>
                        ) : (
                            <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 ml-2" onClick={() => handleVerify(true)}>Verify</button>
                        )}
                    </>
                )}
            </div>
            {actionMsg && <div className="mt-4 text-center text-blue-700">{actionMsg}</div>}
        </div>
    );
} 