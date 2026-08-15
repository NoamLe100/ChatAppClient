import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../api/auth';

type AuthContextValue = {
  userId: number | null;
  userName: string | null;
  name: string | null;
  loading: boolean;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getMe().then(data => {
      setUserId(data?.userId ?? null);
      setUserName(data?.userName ?? null);
      setName(data?.name ?? null);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userName, name, loading, refresh: load }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
