// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo or site name */}
                <Link to="/" className="text-xl font-bold text-green-600">
                    Garissa Market Hub
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/products" className="text-gray-700 hover:text-green-600">Products</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
                    <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
                    <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</Link>
                </div>

                {/* Hamburger icon for mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
                    <Link to="/products" className="block text-gray-700 hover:text-green-600">Products</Link>
                    <Link to="/contact" className="block text-gray-700 hover:text-green-600">Contact</Link>
                    <Link to="/login" className="block text-blue-600 hover:underline">Login</Link>
                    <Link to="/register" className="block text-green-600 hover:underline">Register</Link>
                </div>
            )}
        </nav>
    );
}
