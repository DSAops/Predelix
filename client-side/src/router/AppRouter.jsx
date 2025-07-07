import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import { Auth } from "../pages/authentication/Auth";
import { Navbar } from "../pages/common/Navbar";
import { Footer } from "../pages/common/Footer";
import Predict from "../pages/Predict";
import SmartDrop from "../pages/SmartDrop";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setAuthOpen(true);
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  return (
    <>
      <Auth
        open={authOpen}
        onOpenChange={(open) => {
          setAuthOpen(open);
          if (!open && !user) {
            navigate('/');
          }
        }}
        onLogin={() => {
          setAuthOpen(false);
        }}
        showTrigger={false}
      />
      {user ? children : null}
    </>
  );
}

function AppContent() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleAuthOpenChange(open) {
    setAuthOpen(open);
    if (!open && !user) {
      navigate('/');
    }
  }

  function handleLoginSuccess(userData) {
    setAuthOpen(false);
  }

  async function handleLogout() {
    await logout();
    setAuthOpen(false);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onLoginClick={() => setAuthOpen(true)}
        isLoggedIn={!!user}
        user={user}
        onLogout={handleLogout}
      />
      <Auth
        open={authOpen}
        onOpenChange={handleAuthOpenChange}
        onLogin={handleLoginSuccess}
        showTrigger={false}
      />
      <main className="flex-grow pt-[66px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Predict />
              </ProtectedRoute>
            }
          />
          <Route
            path="/smartdrop"
            element={
              <ProtectedRoute>
                <SmartDrop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
