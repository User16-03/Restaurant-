import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaChevronDown } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
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
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'danger', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* 1. Page Header (Hero) */}
            <div className="page-header d-flex align-items-center" style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/8253285/pexels-photo-8253285.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-white">
                            <h1 className="display-2 fw-bold mb-0 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h1>
                        </div>
                        <div className="col-md-6 text-md-end text-white text-uppercase">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-md-end mb-0 about-hero-breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">GUSTO</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">CONTACT</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Map Section */}
            <div className="google-map py-5 bg-black">
                <div className="container">
                    <div className="overflow-hidden" style={{ borderRadius: '4px', border: '1px solid #333' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093643!2d144.9537353153166!3d-37.816279742021234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1587118331165!5m2!1sen!2sau"
                            width="100%"
                            height="500"
                            style={{ border: 0, filter: 'grayscale(0.8) invert(1)' }}
                            allowFullScreen=""
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>

            {/* 3. Leave A Message Section */}
            <section className="contact-form-bg mb-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Leave A Message</h2>
                        <p className="text-white opacity-75 mx-auto" style={{ maxWidth: '700px', fontStyle: 'italic' }}>
                            At Gusto, we value your feedback and inquiries. Whether you have a question about our menu, want to book a private event, or simply want to share your experience, we're here to listen and assist you.
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {status.message && <div className={`alert alert-${status.type} mb-4`}>{status.message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="input-group-v3">
                                            <input type="text" placeholder="Your Full Name" name="name" value={formData.name} onChange={handleChange} required />
                                            <FaUser className="input-icon" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group-v3">
                                            <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
                                            <FaEnvelope className="input-icon" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group-v3">
                                            <select name="subject" value={formData.subject} onChange={handleChange} className="bg-transparent" required>
                                                <option value="" disabled>---Please choose an option---</option>
                                                <option value="Reservation">Reservation Inquiry</option>
                                                <option value="Feedback">General Feedback</option>
                                                <option value="Event">Private Event</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <FaChevronDown className="input-icon" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group-v3 align-items-start pt-2">
                                            <textarea rows="5" placeholder="Type Your Message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn-submit-v3" disabled={loading}>
                                            {loading ? 'Sending...' : 'Submit Message'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default ContactPage;
