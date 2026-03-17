import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt, FaUtensils, FaCalendarAlt, FaUsers,
    FaEnvelope, FaInfoCircle, FaSignOutAlt, FaHome, FaBars, FaTimes
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Close sidebar on route change (mobile)
    React.useEffect(() => {
        closeSidebar();
    }, [location.pathname]);

    const menuItems = [
        { path: '/admin', icon: <FaTachometerAlt />, label: 'Overview' },
        { path: '/admin/menu', icon: <FaUtensils />, label: 'Food Menu' },
        { path: '/admin/reservations', icon: <FaCalendarAlt />, label: 'Reservations' },
        { path: '/admin/messages', icon: <FaEnvelope />, label: 'Messages' },
        { path: '/admin/users', icon: <FaUsers />, label: 'User Details' },
        { path: '/admin/info', icon: <FaInfoCircle />, label: 'Restaurant Info' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`dashboard-wrapper ${isSidebarOpen ? 'mobile-open' : ''}`}>
            {/* Mobile Overlay */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fw-bold mb-0">GUSTO</h3>
                        <small>ADMIN PANEL</small>
                    </div>
                    <button className="btn-close-sidebar d-lg-none" onClick={closeSidebar}>
                        <FaTimes />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-link border-0">
                        <span className="sidebar-icon"><FaHome /></span>
                        <span className="sidebar-label">Back to Site</span>
                    </Link>
                    <button onClick={handleLogout} className="sidebar-link btn-logout border-0 w-100 text-start bg-transparent">
                        <span className="sidebar-icon"><FaSignOutAlt /></span>
                        <span className="sidebar-label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left d-flex align-items-center gap-3">
                        <button className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
                            <FaBars />
                        </button>
                        <h4 className="mb-0 fw-bold">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h4>
                    </div>
                    <div className="header-right d-flex align-items-center gap-3">
                        <div className="admin-profile d-flex align-items-center gap-2">
                            <div className="profile-img">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="profile-info d-none d-md-block">
                                <span className="d-block fw-bold">{user?.name}</span>
                                <small className="text-muted">Administrator</small>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
