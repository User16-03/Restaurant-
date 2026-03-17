import React from 'react';
import { FaUserShield, FaCalendarAlt, FaFingerprint } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="user-profile">
            <div className="db-card p-0 mx-auto overflow-hidden" style={{ maxWidth: '600px' }}>
                <div className="bg-light p-5 text-center border-bottom">
                    <div className="bg-white p-4 rounded-circle shadow-sm d-inline-block position-relative mb-4">
                        <span className="display-3 fw-bold text-primary">{user?.name.charAt(0)}</span>
                        <div className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-2 small border border-4 border-white">
                            <FaUserShield size={10} />
                        </div>
                    </div>
                    <h4 className="fw-bold mb-0">{user?.name}</h4>
                    <p className="text-muted">{user?.email}</p>
                </div>

                <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-light rounded-3">
                        <div className="d-flex align-items-center gap-3">
                            <FaCalendarAlt className="text-muted" />
                            <div>
                                <small className="d-block text-muted">Join Date</small>
                                <span className="fw-bold">{new Date(user?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <FaFingerprint className="text-muted" />
                            <div>
                                <small className="d-block text-muted">Account Status</small>
                                <span className="badge bg-success">Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-info border-0 shadow-xs mb-0">
                        <p className="small mb-0">
                            <strong>Security Note:</strong> Your account is protected with role-based access. If you need to change your email, please contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
