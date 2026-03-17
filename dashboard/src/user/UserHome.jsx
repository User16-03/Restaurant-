import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUtensils, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserHome = () => {
    const { user } = useAuth();

    const quickActions = [
        { label: 'Book a Table', path: '/reservation', icon: <FaCalendarAlt />, color: '#10b981' },
        { label: 'Browse Menus', path: '/menus', icon: <FaUtensils />, color: '#3b82f6' },
        { label: 'My Account', path: '/dashboard/profile', icon: <FaUser />, color: '#f59e0b' },
    ];

    return (
        <div className="user-home">
            <div className="db-card p-5 mb-5 bg-primary text-white border-0 shadow-lg text-center">
                <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Welcome Home, {user?.name.split(' ')[0]}!
                </h1>
                <p className="lead opacity-75">We are delighted to have you back. Manage your dining experiences below.</p>
            </div>

            <div className="row g-4">
                {quickActions.map((action, idx) => (
                    <div key={idx} className="col-md-4">
                        <Link to={action.path} className="text-decoration-none">
                            <div className="stat-card border-0 shadow-sm py-4">
                                <div className="stat-icon" style={{ backgroundColor: 'rgba(0,0,0,0.03)', color: action.color }}>
                                    {action.icon}
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-0 text-dark">{action.label}</h5>
                                    <small className="text-muted">Quick access</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserHome;
