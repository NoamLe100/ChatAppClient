import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import './ProtectedRoute.css';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userId, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <CircularProgress />
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
