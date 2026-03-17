import { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await axios.post('http://localhost:5000/api/reservations', formData);
            setStatus({ type: 'success', message: 'Reservation created successfully!' });
            setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '', message: '' });
        } catch (error) {
            setStatus({ type: 'danger', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reservation-form-container">
            {status.message && <div className={`alert alert-${status.type}`}>{status.message}</div>}
            <form onSubmit={handleSubmit} className="custom-reservation-form">
                <div className="row g-4">
                    {/* Row 1: 3 Columns */}
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Number of Guest*</label>
                        <input type="number" className="form-control reservation-input" placeholder="Number of Guests" name="guests" value={formData.guests} onChange={handleChange} required min="1" />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Select Date*</label>
                        <input type="date" className="form-control reservation-input" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Select Time*</label>
                        <input type="time" className="form-control reservation-input" name="time" value={formData.time} onChange={handleChange} required />
                    </div>

                    {/* Row 2: 3 Columns */}
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Your Full Name*</label>
                        <input type="text" className="form-control reservation-input" placeholder="Your Full Name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Phone Number*</label>
                        <input type="tel" className="form-control reservation-input" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label text-uppercase small fw-bold mb-2">Email Address*</label>
                        <input type="email" className="form-control reservation-input" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Row 3: 1 Column */}
                    <div className="col-12">
                        <label className="form-label text-uppercase small fw-bold mb-2">Write Special Message*</label>
                        <textarea className="form-control reservation-input" rows="4" placeholder="Write Special Message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                    </div>

                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-book-table rounded-0" disabled={loading}>
                            {loading ? 'BOOKING...' : 'BOOK A TABLE'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
