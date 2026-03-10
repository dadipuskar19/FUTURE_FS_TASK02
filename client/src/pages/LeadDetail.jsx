import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineTrash, HiOutlineChatAlt2 } from 'react-icons/hi';
import api from '../api';
import toast from 'react-hot-toast';

export default function LeadDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState('');
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});

    const fetchLead = async () => {
        try {
            const { data } = await api.get(`/leads/${id}`);
            setLead(data);
            setForm({
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                source: data.source,
                status: data.status
            });
        } catch (err) {
            toast.error('Lead not found');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLead(); }, [id]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            const { data } = await api.put(`/leads/${id}`, { ...form, status: newStatus });
            setLead(data);
            setForm(prev => ({ ...prev, status: newStatus }));
            toast.success(`Status updated to "${newStatus}"`);
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const handleSave = async () => {
        try {
            const { data } = await api.put(`/leads/${id}`, form);
            setLead(data);
            setEditing(false);
            toast.success('Lead updated!');
        } catch (err) {
            toast.error('Failed to update lead');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;
        try {
            await api.delete(`/leads/${id}`);
            toast.success('Lead deleted');
            navigate('/');
        } catch (err) {
            toast.error('Failed to delete lead');
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!noteText.trim()) return;
        try {
            const { data } = await api.post(`/leads/${id}/notes`, { text: noteText });
            setLead(data);
            setNoteText('');
            toast.success('Note added');
        } catch (err) {
            toast.error('Failed to add note');
        }
    };

    const formatDate = (d) => new Date(d).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const formatSource = (s) => s.replace(/_/g, ' ');

    if (loading) return <div className="spinner"></div>;
    if (!lead) return null;

    return (
        <div className="animate-in">
            {/* Header */}
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <HiOutlineArrowLeft />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 className="page-title">{lead.name}</h1>
                    <p className="page-subtitle">{lead.email}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {editing ? (
                        <>
                            <button className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>Edit</button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        <HiOutlineTrash /> Delete
                    </button>
                </div>
            </div>

            <div className="detail-grid">
                {/* Left: Info */}
                <div className="card">
                    {editing ? (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input className="form-input" value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input className="form-input" value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input className="form-input" value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Source</label>
                                    <select className="form-select" value={form.source}
                                        onChange={(e) => setForm({ ...form, source: e.target.value })}>
                                        <option value="website">Website</option>
                                        <option value="referral">Referral</option>
                                        <option value="social_media">Social Media</option>
                                        <option value="email_campaign">Email Campaign</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Full Name</label>
                                <span>{lead.name}</span>
                            </div>
                            <div className="info-item">
                                <label>Email</label>
                                <span>{lead.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Phone</label>
                                <span>{lead.phone || '—'}</span>
                            </div>
                            <div className="info-item">
                                <label>Source</label>
                                <span className="source-tag">{formatSource(lead.source)}</span>
                            </div>
                            <div className="info-item">
                                <label>Status</label>
                                <select className="status-select" value={lead.status} onChange={handleStatusChange}>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                            <div className="info-item">
                                <label>Created</label>
                                <span>{formatDate(lead.createdAt)}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Notes */}
                <div className="card">
                    <div className="notes-section">
                        <h3><HiOutlineChatAlt2 /> Notes & Follow-ups</h3>

                        <form className="note-form" onSubmit={handleAddNote}>
                            <input
                                placeholder="Add a note..."
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                            />
                            <button className="btn btn-primary btn-sm" type="submit">Add</button>
                        </form>

                        {lead.notes.length === 0 ? (
                            <div className="empty-state">
                                <p>No notes yet</p>
                            </div>
                        ) : (
                            [...lead.notes].reverse().map((note, i) => (
                                <div className="note-card" key={i}>
                                    <div className="note-text">{note.text}</div>
                                    <div className="note-date">{formatDate(note.createdAt)}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
