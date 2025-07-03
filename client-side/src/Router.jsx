import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { Auth } from "./pages/authentication/Auth";
import { Navbar } from "./pages/common/Navbar";
import Predict from "./pages/Predict";

function ProtectedRoute({ isLoggedIn, openAuth, children }) {
  const location = useLocation();
  if (!isLoggedIn && location.pathname !== "/") {
    openAuth();
    return <Home />;
  }
  return children;
}

export default function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Handler for dialog open/close
  function handleAuthOpenChange(open) {
    setAuthOpen(open);
    if (!open && !isLoggedIn) {
      // If dialog is closed and user is not logged in, redirect to home
      window.location.pathname = '/';
    }
  }

  // Called on successful login, expects userData object with at least a name property
  function handleLoginSuccess(userData) {
    setIsLoggedIn(true);
    setUser(userData);
    setAuthOpen(false);
  }

  // Called on logout
  function handleLogout() {
    setIsLoggedIn(false);
    setUser(null);
    setAuthOpen(false);
    window.location.pathname = '/';
  }

  return (
    <BrowserRouter>
      <Navbar
        onLoginClick={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <Auth
        open={authOpen}
        onOpenChange={handleAuthOpenChange}
        onLogin={handleLoginSuccess}
        showTrigger={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/predict"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} openAuth={() => setAuthOpen(true)}>
              <Predict />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} openAuth={() => setAuthOpen(true)}>
              <About />
            </ProtectedRoute>
          }
        />
        {/* Add more protected routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}