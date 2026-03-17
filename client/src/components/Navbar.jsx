import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaAngleDown } from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <>
            {/* Top Bar */}
            <div className="bg-primary text-white py-2 small fw-bold">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex gap-4">
                            <span>Mon-Wed: 11a-9p</span>
                            <span className="opacity-75">/</span>
                            <span>Thurs-Sat: 11a-10p</span>
                        </div>
                        <div className="d-flex gap-4 text-end">
                            <span>123 456 7899</span>
                            <span className="opacity-75">/</span>
                            <span>296 Riada Avenie Mor Berlin 251584</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="navbar navbar-expand-lg navbar-sticky bg-white py-4 shadow-sm">
                <div className="container">
                    {/* Logo */}
                    <Link className="navbar-brand fw-bold fs-2 text-dark letter-spacing-1 me-5" to="/" style={{ fontFamily: 'var(--font-body)' }}>
                        GUSTO
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Centered Menu */}
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold align-items-center gap-1">
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/">HOME</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/about">ABOUT</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/menus">MENUS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/reservation">RESERVATION</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/contact">CONTACT</NavLink>
                            </li>
                        </ul>

                        {/* Right Side Icons & Button */}
                        <div className="d-flex align-items-center gap-4">
                            <a href="#" className="text-dark"><FaSearch size={18} /></a>
                            <a href="#" className="text-dark position-relative me-2">
                                <FaShoppingCart size={18} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ fontSize: '0.6rem', width: '16px', height: '16px' }}>0</span>
                            </a>
                            <Link to="/reservation" className="btn btn-primary rounded-0 px-4 py-2 fw-bold" style={{ fontSize: '0.9rem' }}>
                                FIND A TABLE
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
