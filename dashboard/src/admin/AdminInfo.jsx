import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaStore } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminInfo = () => {
    const { user } = useAuth();
    const [restaurantInfo, setRestaurantInfo] = useState({
        address: '', phone: '', email: '', openingHours: { lunch: '', dinner: '' }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/restaurant');
                if (data) setRestaurantInfo(data);
            } catch (error) {
                console.error('Error fetching info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    const handleUpdateRestaurantInfo = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put('http://localhost:5000/api/restaurant', restaurantInfo, config);
            alert('Restaurant info updated successfully!');
        } catch (error) {
            alert('Error updating info');
        }
    };

    return (
        <div className="admin-info">
            <div className="db-card p-4 mx-auto" style={{ maxWidth: '800px' }}>
                <div className="text-center mb-5">
                    <div className="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-3">
                        <FaStore className="text-primary fs-2" />
                    </div>
                    <h5 className="fw-bold">Global Restaurant Settings</h5>
                    <p className="small text-muted">Update your contact and operational details</p>
                </div>

                <form onSubmit={handleUpdateRestaurantInfo}>
                    <div className="row g-4">
                        <div className="col-12">
                            <label className="form-label small fw-bold">Street Address</label>
                            <input type="text" className="form-control p-3 bg-light border-0" value={restaurantInfo.address} onChange={e => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Official Phone</label>
                            <input type="text" className="form-control p-3 bg-light border-0" value={restaurantInfo.phone} onChange={e => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Contact Email</label>
                            <input type="email" className="form-control p-3 bg-light border-0" value={restaurantInfo.email} onChange={e => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Lunch Service Hours</label>
                            <input type="text" className="form-control p-3 bg-light border-0" value={restaurantInfo.openingHours.lunch} onChange={e => setRestaurantInfo({ ...restaurantInfo, openingHours: { ...restaurantInfo.openingHours, lunch: e.target.value } })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Dinner Service Hours</label>
                            <input type="text" className="form-control p-3 bg-light border-0" value={restaurantInfo.openingHours.dinner} onChange={e => setRestaurantInfo({ ...restaurantInfo, openingHours: { ...restaurantInfo.openingHours, dinner: e.target.value } })} />
                        </div>
                        <div className="col-12 mt-5 text-center">
                            <button className="btn btn-primary px-5 py-3 fw-bold rounded-pill d-inline-flex align-items-center gap-3">
                                <FaSave /> SAVE ALL CHANGES
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminInfo;
