import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-lg font-bold">Psychs.com</Link>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <Link to="/products" className="hover:text-gray-300">Products</Link>
                    {isAuthenticated() && (
                        <>
                            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
                            <Link to="/services/book" className="hover:text-gray-300">Book Service</Link>
                        </>
                    )}
                    {!isAuthenticated() ? (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="hover:text-gray-300">Register</Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
