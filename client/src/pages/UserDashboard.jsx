import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaUser, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyReservations = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/reservations/my', config);
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyReservations();
        }
    }, [user]);

    if (!user) return <div className="text-center py-5">Please login to view dashboard</div>;

    return (
        <div className="user-dashboard section-padding bg-light min-vh-100">
            <div className="container">
                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm rounded-0 p-4 sticky-top" style={{ top: '100px' }}>
                            <div className="text-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    <FaUser />
                                </div>
                                <h5 className="fw-bold mb-1">{user.name}</h5>
                                <p className="small text-muted mb-0">{user.email}</p>
                            </div>
                            <hr />
                            <div className="list-group list-group-flush">
                                <Link to="/dashboard" className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center gap-2 active bg-transparent text-primary fw-bold">
                                    <FaCalendarAlt /> My Bookings
                                </Link>
                                <button onClick={logout} className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center gap-2 text-danger">
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm rounded-0 p-5">
                            <div className="d-flex justify-content-between align-items-center mb-5">
                                <h3 className="fw-bold mb-0" style={{ fontFamily: 'var(--font-heading)' }}>My Bookings</h3>
                                <Link to="/reservation" className="btn btn-primary rounded-0 px-4">New Reservation</Link>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">Loading your bookings...</div>
                            ) : reservations.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="border-0 px-4 py-3">Date</th>
                                                <th className="border-0 py-3">Time</th>
                                                <th className="border-0 py-3">Guests</th>
                                                <th className="border-0 py-3 text-end px-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservations.map((res) => (
                                                <tr key={res._id}>
                                                    <td className="px-4 py-4">{new Date(res.date).toLocaleDateString()}</td>
                                                    <td>{res.time}</td>
                                                    <td>{res.guests} Persons</td>
                                                    <td className="text-end px-4">
                                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">Confirmed</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <FaHistory size={50} className="text-muted mb-3 opacity-25" />
                                    <p className="text-muted">You haven't booked any tables yet.</p>
                                    <Link to="/reservation" className="text-primary fw-bold text-decoration-none">Book your first table now!</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
