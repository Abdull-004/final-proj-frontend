import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';
import MarketplaceFeed from './MarketplaceFeed';
import ProductDetails from './ProductDetails';
import ProductForm from './ProductForm';
import Messaging from './Messaging';
import Profile from './Profile';

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white shadow mb-4">
        <div className="font-bold text-lg text-green-700 cursor-pointer" onClick={() => navigate('/')}>Garissa Market Hub</div>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-700 hover:text-green-700">Home</Link>
          {user && user.role === 'Farmer' && <Link to="/create-product" className="text-gray-700 hover:text-green-700">Create Listing</Link>}
          {user && (user.role === 'Vet' || user.role === 'Service Provider') && <Link to="/profile" className="text-gray-700 hover:text-green-700">Profile</Link>}
          {user && <Link to="/messages" className="text-gray-700 hover:text-green-700">Messages</Link>}
          {!user && <Link to="/login" className="text-gray-700 hover:text-green-700">Login</Link>}
          {!user && <Link to="/register" className="text-gray-700 hover:text-green-700">Register</Link>}
          {user && (
            <>
              <span className="text-gray-700 font-medium">{user.name} ({user.role})</span>
              <button onClick={logout} className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<MarketplaceFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {user && user.role === 'Farmer' && <Route path="/create-product" element={<ProductForm />} />}
        {user && user.role === 'Farmer' && <Route path="/edit-product/:id" element={<ProductForm editMode={true} />} />}
        {user && (user.role === 'Vet' || user.role === 'Service Provider') && <Route path="/profile" element={<Profile />} />}
        <Route path="/messages" element={<Messaging />} />
      </Routes>
    </>
  );
}
