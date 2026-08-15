import { Auth } from "./components/Auth/Auth";
import { ChatLayout } from "./components/ChatLayout/ChatLayout";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { RedirectIfAuthed } from "./components/RedirectIfAuthed/RedirectIfAuthed";
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
            <Route path="/register" element={<RedirectIfAuthed><Auth /></RedirectIfAuthed>} />
            <Route path="/login" element={<RedirectIfAuthed><Auth /></RedirectIfAuthed>} />
            <Route path="/chat" element={<ProtectedRoute><ChatLayout /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
