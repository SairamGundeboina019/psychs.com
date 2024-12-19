import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.css'; // Custom styles for the header

const Header = React.memo(() => {
    return (
        <header className="header bg-black text-gold py-3">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link to="/" className="logo text-warning text-decoration-none">
                    Psychs.com
                </Link>
                
                {/* Navigation */}
                <nav className="nav">
                    <ul className="nav-list d-flex mb-0">
                        <li className="nav-item">
                            <Link className="nav-link text-gold" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-gold" to="/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-gold" to="/services/book">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-gold" to="/cart">
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-gold" to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
});

export default Header;
