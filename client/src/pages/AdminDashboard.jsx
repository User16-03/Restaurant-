import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaSignOutAlt, FaPlus, FaUtensils, FaInfoCircle, FaUsers, FaCalendarAlt, FaEnvelope, FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState({
        address: '', phone: '', email: '', openingHours: { lunch: '', dinner: '' }
    });
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('reservations');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Menu Form State
    const [menuForm, setMenuForm] = useState({
        name: '', category: '', price: '', image: '', description: '', badge: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [user, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            const [resRes, resMsg, resMenu, resInfo, resUsers] = await Promise.all([
                axios.get('http://localhost:5000/api/reservations', config),
                axios.get('http://localhost:5000/api/contact', config),
                axios.get('http://localhost:5000/api/menu', config),
                axios.get('http://localhost:5000/api/restaurant', config),
                axios.get('http://localhost:5000/api/auth/users', config)
            ]);

            setReservations(resRes.data);
            setMessages(resMsg.data);
            setMenuItems(resMenu.data);
            setRestaurantInfo(resInfo.data);
            setUsers(resUsers.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('http://localhost:5000/api/menu', menuForm, config);
            setMenuItems([...menuItems, data]);
            setMenuForm({ name: '', category: '', price: '', image: '', description: '', badge: '' });
            alert('Menu item added successfully!');
        } catch (error) {
            alert('Error adding menu item');
        }
    };

    const handleDeleteMenuItem = async (id) => {
        if (!window.confirm('Delete this dish?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/menu/${id}`, config);
            setMenuItems(menuItems.filter(item => item._id !== id));
        } catch (error) {
            alert('Error deleting item');
        }
    };

    const handleDeleteReservation = async (id) => {
        if (!window.confirm('Delete this reservation?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/reservations/${id}`, config);
            setReservations(reservations.filter(res => res._id !== id));
        } catch (error) {
            alert('Error deleting reservation');
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/contact/${id}`, config);
            setMessages(messages.filter(msg => msg._id !== id));
        } catch (error) {
            alert('Error deleting message');
        }
    };

    const handleUpdateRestaurantInfo = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put('http://localhost:5000/api/restaurant', restaurantInfo, config);
            alert('Restaurant info updated!');
        } catch (error) {
            alert('Error updating info');
        }
    };

    if (!user) return null;

    return (
        <div className="admin-dashboard py-5 bg-light min-vh-100">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold mb-0" style={{ fontFamily: 'var(--font-heading)' }}>Admin Dashboard</h2>
                        <p className="text-muted mb-0">Manage your restaurant operations</p>
                    </div>
                    <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={logout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                <div className="row g-4">
                    {/* Sidebar Nav */}
                    <div className="col-lg-3">
                        <div className="list-group shadow-sm border-0 rounded-0">
                            <button onClick={() => setActiveTab('reservations')} className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === 'reservations' ? 'active bg-primary' : ''}`}>
                                <FaCalendarAlt /> Reservations <span className="badge bg-white text-dark ms-auto">{reservations.length}</span>
                            </button>
                            <button onClick={() => setActiveTab('menu')} className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === 'menu' ? 'active bg-primary' : ''}`}>
                                <FaUtensils /> Food Menu <span className="badge bg-white text-dark ms-auto">{menuItems.length}</span>
                            </button>
                            <button onClick={() => setActiveTab('messages')} className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === 'messages' ? 'active bg-primary' : ''}`}>
                                <FaEnvelope /> Messages <span className="badge bg-white text-dark ms-auto">{messages.length}</span>
                            </button>
                            <button onClick={() => setActiveTab('info')} className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === 'info' ? 'active bg-primary' : ''}`}>
                                <FaInfoCircle /> Restaurant Info
                            </button>
                            <button onClick={() => setActiveTab('users')} className={`list-group-item list-group-item-action border-0 p-3 d-flex align-items-center gap-3 ${activeTab === 'users' ? 'active bg-primary' : ''}`}>
                                <FaUsers /> User Details <span className="badge bg-white text-dark ms-auto">{users.length}</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="col-lg-9">
                        <div className="card shadow-sm border-0 rounded-0 p-4">
                            {activeTab === 'reservations' && (
                                <div>
                                    <h4 className="fw-bold mb-4">Booked Tables</h4>
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th>Customer</th>
                                                    <th>Contact</th>
                                                    <th>Schedule</th>
                                                    <th>Guests</th>
                                                    <th className="text-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.map(res => (
                                                    <tr key={res._id}>
                                                        <td>
                                                            <div className="fw-bold">{res.name}</div>
                                                            <div className="small text-muted">{res.email}</div>
                                                        </td>
                                                        <td>{res.phone}</td>
                                                        <td>
                                                            <div>{res.date}</div>
                                                            <div className="small text-muted">{res.time}</div>
                                                        </td>
                                                        <td>{res.guests} P</td>
                                                        <td className="text-end">
                                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReservation(res._id)}><FaTrash /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'menu' && (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold mb-0">Manage Food Menu</h4>
                                    </div>

                                    <form onSubmit={handleAddMenuItem} className="bg-light p-4 mb-4 rounded">
                                        <h6 className="fw-bold mb-3">Add New Dish</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Dish Name" value={menuForm.name} onChange={e => setMenuForm({ ...menuForm, name: e.target.value })} required /></div>
                                            <div className="col-md-3"><input type="text" className="form-control" placeholder="Category" value={menuForm.category} onChange={e => setMenuForm({ ...menuForm, category: e.target.value })} required /></div>
                                            <div className="col-md-3"><input type="text" className="form-control" placeholder="Price (e.g. $25)" value={menuForm.price} onChange={e => setMenuForm({ ...menuForm, price: e.target.value })} required /></div>
                                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Image URL" value={menuForm.image} onChange={e => setMenuForm({ ...menuForm, image: e.target.value })} required /></div>
                                            <div className="col-md-6"><input type="text" className="form-control" placeholder="Badge (Optional)" value={menuForm.badge} onChange={e => setMenuForm({ ...menuForm, badge: e.target.value })} /></div>
                                            <div className="col-12"><textarea className="form-control" placeholder="Description" rows="2" value={menuForm.description} onChange={e => setMenuForm({ ...menuForm, description: e.target.value })}></textarea></div>
                                            <div className="col-12"><button className="btn btn-primary d-flex align-items-center gap-2"><FaPlus /> Add Dish to Menu</button></div>
                                        </div>
                                    </form>

                                    <div className="row g-3">
                                        {menuItems.map(item => (
                                            <div key={item._id} className="col-md-6">
                                                <div className="d-flex gap-3 align-items-center p-3 border rounded shadow-xs">
                                                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                                                    <div className="flex-grow-1">
                                                        <div className="fw-bold">{item.name}</div>
                                                        <div className="small text-muted">{item.category} • {item.price}</div>
                                                    </div>
                                                    <button className="btn btn-link text-danger" onClick={() => handleDeleteMenuItem(item._id)}><FaTrash /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'info' && (
                                <div>
                                    <h4 className="fw-bold mb-4">Edit Restaurant Details</h4>
                                    <form onSubmit={handleUpdateRestaurantInfo}>
                                        <div className="row g-4">
                                            <div className="col-md-12">
                                                <label className="form-label small fw-bold">Address</label>
                                                <input type="text" className="form-control" value={restaurantInfo.address} onChange={e => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Phone</label>
                                                <input type="text" className="form-control" value={restaurantInfo.phone} onChange={e => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Email</label>
                                                <input type="email" className="form-control" value={restaurantInfo.email} onChange={e => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Lunch Hours</label>
                                                <input type="text" className="form-control" value={restaurantInfo.openingHours.lunch} onChange={e => setRestaurantInfo({ ...restaurantInfo, openingHours: { ...restaurantInfo.openingHours, lunch: e.target.value } })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Dinner Hours</label>
                                                <input type="text" className="form-control" value={restaurantInfo.openingHours.dinner} onChange={e => setRestaurantInfo({ ...restaurantInfo, openingHours: { ...restaurantInfo.openingHours, dinner: e.target.value } })} />
                                            </div>
                                            <div className="col-12 mt-5">
                                                <button className="btn btn-primary px-5 py-3 fw-bold">SAVE ALL CHANGES</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'messages' && (
                                <div>
                                    <h4 className="fw-bold mb-4">Customer Messages</h4>
                                    <div className="list-group list-group-flush">
                                        {messages.map(msg => (
                                            <div key={msg._id} className="list-group-item border rounded mb-3 p-4 bg-light bg-opacity-50">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h6 className="fw-bold mb-0">{msg.name}</h6>
                                                        <span className="small text-muted">{msg.email} • {new Date(msg.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <button className="btn btn-sm btn-link text-danger" onClick={() => handleDeleteMessage(msg._id)}><FaTrash /></button>
                                                </div>
                                                <p className="mb-0 small" style={{ lineHeight: '1.6' }}>{msg.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
