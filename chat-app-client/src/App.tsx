import { SignIn } from './components/SingIn';
import { Register } from './components/Register';
import { ChatLayout } from './components/ChatLayout';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;