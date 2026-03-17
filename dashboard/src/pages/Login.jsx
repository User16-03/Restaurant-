import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center" style={{
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-uppercase">GUSTO</h2>
                                    <p className="text-muted">Dashboard Login</p>
                                </div>

                                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3">
                                        LOGIN TO DASHBOARD
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="text-muted small mb-2">
                                        Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register</Link>
                                    </p>
                                    <a href="http://localhost:5173" className="text-muted small text-decoration-none">← Back to Main Site</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
