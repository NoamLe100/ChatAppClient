import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import './AuthGate.css';

type AuthGateProps = {
  children: React.ReactNode;
  mode: 'requireAuth' | 'requireGuest';
};

export function AuthGate({ children, mode }: AuthGateProps) {
  const { userId, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <CircularProgress />
      </div>
    );
  }

  if (mode === 'requireAuth' && !userId) {
    return <Navigate to="/login" replace />;
  }

  if (mode === 'requireGuest' && userId) {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
}