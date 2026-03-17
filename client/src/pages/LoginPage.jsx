import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(email, password);
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="login-page section-padding d-flex align-items-center justify-content-center" style={{
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/about-hero-v2.jpg")',
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
                                    <h2 className="fw-bold text-uppercase" style={{ fontFamily: 'var(--font-heading)' }}>Login</h2>
                                    <p className="text-muted small">Welcome back to Gusto Restaurant</p>
                                </div>

                                {error && <div className="alert alert-danger rounded-0 small py-2">{error}</div>}

                                <form onSubmit={handleSubmit}>
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
                                        LOGIN
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="small text-muted mb-0">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register Now</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
