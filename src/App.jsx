import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Checkout from './Checkout';
import Account from './Account';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import About from './About';
import AllInOneAgrovet from './features/AllInOneAgrovet';
import FastDelivery from './features/FastDelivery';
import ExpertSupport from './features/ExpertSupport';
import Services from './Services';
import Contact from './Contact';
import { useAuth } from './AuthContext';

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-4 bg-white shadow mb-4">
        <div className="font-bold text-lg text-green-700 cursor-pointer" onClick={() => navigate('/')}>Garissa Agrovet</div>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-700 hover:text-green-700">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-green-700">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
          <div className="relative group inline-block">
            <span className="text-gray-700 hover:text-green-700 cursor-pointer">Features</span>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto z-20">
              <Link to="/features/all-in-one" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">All-in-One Agrovet</Link>
              <Link to="/features/delivery" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Fast Delivery</Link>
              <Link to="/features/expert-support" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Expert Support</Link>
            </div>
          </div>
          <Link to="/products" className="text-gray-700 hover:text-green-700">Products</Link>
          <Link to="/cart" className="text-gray-700 hover:text-green-700">Cart</Link>
          {!user && <Link to="/account" className="text-gray-700 hover:text-green-700 font-semibold">Login</Link>}
          <Link to="/admin-login" className="text-gray-700 hover:text-green-700 font-semibold">Admin Login</Link>
          {user && user.isAdmin && <Link to="/admin" className="text-gray-700 hover:text-green-700">Admin Dashboard</Link>}
          {user && !user.isAdmin && <Link to="/account" className="text-gray-700 hover:text-green-700">Account</Link>}
          {user && (
            <>
              <span className="text-gray-700 font-medium">{user.email}</span>
              <button onClick={logout} className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features/all-in-one" element={<AllInOneAgrovet />} />
        <Route path="/features/delivery" element={<FastDelivery />} />
        <Route path="/features/expert-support" element={<ExpertSupport />} />
        <Route path="/products" element={<ProductGallery />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
