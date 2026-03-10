import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineUsers, HiOutlineStar, HiOutlinePhone, HiOutlineCheckCircle } from 'react-icons/hi';
import api from '../api';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    const fetchLeads = async () => {
        try {
            const params = {};
            if (search) params.search = search;
            if (statusFilter) params.status = statusFilter;
            const { data } = await api.get('/leads', { params });
            setLeads(data);
        } catch (err) {
            toast.error('Failed to load leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [statusFilter]);

    useEffect(() => {
        const timer = setTimeout(fetchLeads, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        converted: leads.filter(l => l.status === 'converted').length
    };

    const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    const formatSource = (s) => s.replace(/_/g, ' ');

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Manage and track all your leads</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/leads/new')}>
                    + New Lead
                </button>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon total"><HiOutlineUsers /></div>
                    <div>
                        <div className="stat-number">{stats.total}</div>
                        <div className="stat-label">Total Leads</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon new"><HiOutlineStar /></div>
                    <div>
                        <div className="stat-number">{stats.new}</div>
                        <div className="stat-label">New</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon contacted"><HiOutlinePhone /></div>
                    <div>
                        <div className="stat-number">{stats.contacted}</div>
                        <div className="stat-label">Contacted</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon converted"><HiOutlineCheckCircle /></div>
                    <div>
                        <div className="stat-number">{stats.converted}</div>
                        <div className="stat-label">Converted</div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="card">
                <div className="table-toolbar">
                    <div className="search-box">
                        <HiOutlineSearch />
                        <input
                            type="text"
                            placeholder="Search leads by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>

                {/* Table */}
                {leads.length === 0 ? (
                    <div className="empty-state">
                        <HiOutlineUsers />
                        <p>No leads found. Click "New Lead" to add one.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead._id} onClick={() => navigate(`/leads/${lead._id}`)}>
                                        <td><span className="lead-name">{lead.name}</span></td>
                                        <td><span className="lead-email">{lead.email}</span></td>
                                        <td><span className="source-tag">{formatSource(lead.source)}</span></td>
                                        <td><span className={`badge badge-${lead.status}`}>{lead.status}</span></td>
                                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.83rem' }}>{formatDate(lead.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
