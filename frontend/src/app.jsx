import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './auth/signup';
import Login from './auth/login';
import Home from './home';
import LandingPage from './LandingPage';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setAuth(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/home" /> : <LandingPage />} />
        
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/login" element={auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />} />

        <Route path="/home" element={auth ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;