import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // We'll filter based on user email from all reservations (simplified logic for demo)
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/reservations', config);
                // In a real app, the backend would filter this, but we'll client-side filter for now
                setBookings(data.filter(b => b.email === user.email));
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [user.email, user.token]);

    if (loading) return <div>Loading your history...</div>;

    return (
        <div className="user-bookings">
            {bookings.length > 0 ? (
                <div className="row g-4">
                    {bookings.map(booking => (
                        <div key={booking._id} className="col-md-6 col-lg-4">
                            <div className="db-card p-4 h-100 position-relative border-0 shadow-sm">
                                <span className="position-absolute top-0 end-0 m-3 badge bg-success bg-opacity-10 text-success">Confirmed</span>
                                <h6 className="fw-bold mb-3">{booking.name}</h6>
                                <div className="d-flex align-items-center gap-2 mb-2 small">
                                    <FaCalendarCheck className="text-primary" />
                                    <span>{booking.date}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-2 small">
                                    <FaClock className="text-primary" />
                                    <span>{booking.time}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-4 small">
                                    <FaUsers className="text-primary" />
                                    <span>{booking.guests} Guests</span>
                                </div>
                                <div className="text-muted small">Managed via {booking.phone}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="db-card p-5 text-center">
                    <div className="opacity-25 mb-3"><FaCalendarCheck size={64} /></div>
                    <h4 className="fw-bold">No Bookings Yet</h4>
                    <p className="text-muted mb-4">You haven't made any reservations with us yet. Ready for an amazing meal?</p>
                    <Link to="/reservation" className="btn btn-primary px-4 py-2 rounded-pill">Book a Table Now <FaArrowRight className="ms-2" /></Link>
                </div>
            )}
        </div>
    );
};

export default UserBookings;
