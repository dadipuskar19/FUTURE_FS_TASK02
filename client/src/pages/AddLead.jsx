import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import api from '../api';
import toast from 'react-hot-toast';

export default function AddLead() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'website'
    });

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/leads', form);
            toast.success('Lead created successfully!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create lead');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in">
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <HiOutlineArrowLeft />
                </button>
                <div>
                    <h1 className="page-title">Add New Lead</h1>
                    <p className="page-subtitle">Fill in the lead's contact information</p>
                </div>
            </div>

            <div className="card form-card">
                <form onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                placeholder="Jane Smith"
                                value={form.name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address *</label>
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="jane@example.com"
                                value={form.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                                className="form-input"
                                type="text"
                                name="phone"
                                placeholder="+1-555-0123"
                                value={form.phone}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Lead Source</label>
                            <select
                                className="form-select"
                                name="source"
                                value={form.source}
                                onChange={onChange}
                            >
                                <option value="website">Website</option>
                                <option value="referral">Referral</option>
                                <option value="social_media">Social Media</option>
                                <option value="email_campaign">Email Campaign</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Create Lead'}
                        </button>
                        <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
