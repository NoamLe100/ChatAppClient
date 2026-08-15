import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import './RedirectIfAuthed.css';

type Props = { children: React.ReactNode };

export function RedirectIfAuthed({ children }: Props) {
  const { userId, loading } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <CircularProgress />
      </div>
    );
  }

  if (userId) {
    return <Navigate to="/chat" replace />;
  }

  return <>{children}</>;
}
