import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Your Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center gap-4 bg-white rounded shadow p-4 border border-gray-100">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="font-bold text-lg text-green-800">{item.name}</div>
                                    <div className="text-gray-700">Ksh {item.price}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <label className="text-sm">Qty:</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => updateQuantity(item._id, Math.max(1, Number(e.target.value)))}
                                            className="w-16 border rounded px-2 py-1"
                                        />
                                    </div>
                                </div>
                                <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 font-semibold" onClick={() => removeFromCart(item._id)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xl font-bold">Total: Ksh {total}</div>
                        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 font-semibold" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 