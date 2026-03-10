import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isRegister) {
                await register(form.name, form.email, form.password);
                toast.success('Account created successfully!');
            } else {
                await login(form.email, form.password);
                toast.success('Welcome back!');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card animate-in">
                <div className="login-header">
                    <div className="logo-icon">📊</div>
                    <h1>LeadFlow CRM</h1>
                    <p>{isRegister ? 'Create your admin account' : 'Sign in to your account'}</p>
                </div>

                <form onSubmit={onSubmit}>
                    {isRegister && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={onChange}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="admin@crm.com"
                            value={form.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={onChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="login-toggle">
                    {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                    <button onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Sign In' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
}
