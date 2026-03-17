import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="login-page section-padding d-flex align-items-center justify-content-center" style={{
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/footer/tikka.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-lg rounded-0 overflow-hidden">
                            <div className="card-body p-5">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold text-uppercase" style={{ fontFamily: 'var(--font-heading)' }}>Register</h2>
                                    <p className="text-muted small">Join Gusto Restaurant Family</p>
                                </div>

                                {error && <div className="alert alert-danger rounded-0 small py-2">{error}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <div className="input-group-v3">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <FaUser className="input-icon" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="input-group-v3">
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <FaEnvelope className="input-icon" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="input-group-v3">
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <FaLock className="input-icon" />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn-submit-v3 mt-3">
                                        REGISTER
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="small text-muted mb-0">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login Here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
