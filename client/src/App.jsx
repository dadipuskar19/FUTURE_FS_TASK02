import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddLead from './pages/AddLead';
import LeadDetail from './pages/LeadDetail';

function App() {
    const { user } = useAuth();

    return (
        <div className="app">
            {user && <Navbar />}
            <main className={user ? 'main-content' : 'main-content full'}>
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/leads/new" element={<ProtectedRoute><AddLead /></ProtectedRoute>} />
                    <Route path="/leads/:id" element={<ProtectedRoute><LeadDetail /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
