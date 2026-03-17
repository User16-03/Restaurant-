import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPhone, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminReservations = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/reservations', config);
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
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

    return (
        <div className="admin-reservations">
            <div className="db-card">
                <div className="db-card-header">
                    <h5 className="fw-bold mb-0">Booked Tables List</h5>
                    <span className="badge bg-primary">{reservations.length} Total</span>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0">Customer</th>
                                <th className="py-3 border-0">Schedule</th>
                                <th className="py-3 border-0">Guests</th>
                                <th className="py-3 border-0">Contact</th>
                                <th className="px-4 py-3 border-0 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(res => (
                                <tr key={res._id}>
                                    <td className="px-4 py-3">
                                        <div className="fw-bold">{res.name}</div>
                                        <div className="small text-muted">{res.email}</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <FaCalendarAlt className="text-muted small" />
                                            <span>{res.date}</span>
                                        </div>
                                        <div className="small text-muted">{res.time}</div>
                                    </td>
                                    <td className="py-3">
                                        <span className="badge bg-light text-dark border">{res.guests} Persons</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="small">{res.phone}</div>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <button className="btn btn-sm btn-light text-danger rounded-circle p-2" onClick={() => handleDeleteReservation(res._id)}>
                                            <FaTrash size={12} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReservations;
