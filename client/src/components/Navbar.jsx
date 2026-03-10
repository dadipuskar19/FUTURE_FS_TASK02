import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineViewGrid, HiOutlinePlusCircle, HiOutlineLogout } from 'react-icons/hi';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: <HiOutlineViewGrid /> },
        { path: '/leads/new', label: 'Add Lead', icon: <HiOutlinePlusCircle /> }
    ];

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : '?';

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">📊</div>
                    LeadFlow CRM
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-card">
                    <div className="user-avatar">{initials}</div>
                    <div className="user-info">
                        <div className="user-name">{user?.name}</div>
                        <div className="user-email">{user?.email}</div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Logout">
                        <HiOutlineLogout size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
