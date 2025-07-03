import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { Auth } from "./pages/authentication/auth";
import { Navbar } from "./pages/common/Navbar";

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

  function handleLoginSuccess() {
    setIsLoggedIn(true);
    setAuthOpen(false);
  }

  return (
    <BrowserRouter>
      <Navbar onLoginClick={() => setAuthOpen(true)} isLoggedIn={isLoggedIn} />
      <Auth open={authOpen} onOpenChange={setAuthOpen} onLogin={handleLoginSuccess} showTrigger={false} />
      <Routes>
        <Route path="/" element={<Home />} />
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