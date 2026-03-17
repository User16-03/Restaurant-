import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUtensils, FaCalendarAlt, FaUsers, FaEnvelope, FaLightbulb } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        menu: 0,
        reservations: 0,
        users: 0,
        messages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [resMenu, resRes, resUsers, resMsg] = await Promise.all([
                    axios.get('http://localhost:5000/api/menu'),
                    axios.get('http://localhost:5000/api/reservations', config),
                    axios.get('http://localhost:5000/api/auth/users', config),
                    axios.get('http://localhost:5000/api/contact', config)
                ]);

                setStats({
                    menu: resMenu.data.length,
                    reservations: resRes.data.length,
                    users: resUsers.data.length,
                    messages: resMsg.data.length
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user.token]);

    const statCards = [
        { label: 'Total Dishes', value: stats.menu, icon: <FaUtensils />, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Reservations', value: stats.reservations, icon: <FaCalendarAlt />, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Registered Users', value: stats.users, icon: <FaUsers />, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Messages', value: stats.messages, icon: <FaEnvelope />, color: '#6366f1', bg: '#eef2ff' },
    ];

    if (loading) return <div>Loading overview...</div>;

    return (
        <div className="admin-home">
            <div className="row g-4 mb-5">
                {statCards.map((card, idx) => (
                    <div key={idx} className="col-lg-3 col-md-6 col-sm-6">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: card.bg, color: card.color }}>
                                {card.icon}
                            </div>
                            <div>
                                <small className="text-muted text-uppercase fw-bold letter-spacing-1" style={{ fontSize: '0.7rem' }}>{card.label}</small>
                                <h3 className="fw-bold mb-0">{card.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="db-card p-4">
                        <h5 className="fw-bold mb-4">Recent Activity</h5>
                        <p className="text-muted">Welcome back, {user?.name}. Everything is running smoothly today.</p>
                        
                        {stats.menu === 0 ? (
                            <div className="alert alert-info border-0 shadow-sm p-4 mb-0 d-flex gap-3 align-items-center">
                                <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                                    <FaLightbulb size={24} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1 text-info">Getting Started</h6>
                                    <p className="mb-0 small text-dark">Your menu is currently empty. Use the <strong>"Add New Menu Item"</strong> link to start building your digital presence!</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-5 text-center bg-light rounded-3 border-dashed">
                                <p className="mb-0 text-muted">Analytics chart would go here.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="db-card p-4">
                        <h5 className="fw-bold mb-4">Quick Links</h5>
                        <div className="d-grid gap-2">
                            <Link to="/admin/menu" className="btn btn-outline-primary text-start p-3 rounded-3 d-flex justify-content-between align-items-center text-decoration-none">
                                <span>Add New Menu Item</span>
                                <FaUtensils className="opacity-50" />
                            </Link>
                            <Link to="/admin/reservations" className="btn btn-outline-secondary text-start p-3 rounded-3 d-flex justify-content-between align-items-center text-decoration-none">
                                <span>View All Reservations</span>
                                <FaCalendarAlt className="opacity-50" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
