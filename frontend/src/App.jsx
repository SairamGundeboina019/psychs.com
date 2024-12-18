import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage'; // Import the Product Details Page
import ServiceBookingPage from './pages/ServiceBookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { isAuthenticated } from './services/auth';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
    return (
      

      
        <Router>
            {/* Render Navbar across all routes */}
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} /> {/* Dynamic route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/cart"
                    element={isAuthenticated() ? <CartPage /> : <LoginPage />}
                />
                <Route
                    path="/services/book"
                    element={isAuthenticated() ? <ServiceBookingPage /> : <LoginPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
