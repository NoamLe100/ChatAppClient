import { Auth } from "./components/Auth/Auth";
import { ChatLayout } from "./components/ChatLayout/ChatLayout";
import { AuthGate } from "./components/AuthGate/AuthGate";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthGate mode="requireGuest"><Auth /></AuthGate>} />
            <Route path="/register" element={<AuthGate mode="requireGuest"><Auth /></AuthGate>} />
            <Route path="/chat" element={<AuthGate mode="requireAuth"><ChatLayout /></AuthGate>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
