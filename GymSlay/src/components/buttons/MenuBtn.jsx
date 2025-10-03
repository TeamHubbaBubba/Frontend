import React, { useState, useEffect } from "react";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import menuIcon from "../../assets/images/MenuBtn.svg";
import "./buttons.css";
import { useNavigate } from "react-router-dom";
import { signIn, signOut } from "../../services/api";
import SignInModal from "../forms/SignInModal";

export const MenuBtn = () => {
  const [open, setOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);;
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();;
  const location = useLocation();

  useEffect(() => {
    const isOnAdminPage = location.pathname.includes('Admin') || location.pathname.includes('createsessions');
    setIsAdminMode(isOnAdminPage);
  }, [location.pathname]);

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const session = localStorage.getItem("session");
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          setIsAuthenticated(sessionData.isLoggedIn === true);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    // Check initial status
    checkAuthStatus();

    // Listen for localStorage changes
    const interval = setInterval(checkAuthStatus, 1000);
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleToggle = () => setOpen(!open);

  const handleSignInClick = () => {
    setOpen(false);
    setShowSignInModal(true);
  };

  const handleSignIn = async (formData) => {
    console.log("Sign in attempt with:", formData);

    try {
      const result = await signIn(formData);

      // Store user session info (authentication is handled by cookies)
      const sessionData = {
        email: formData.email,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("session", JSON.stringify(sessionData));

      // Update authentication state immediately
      setIsAuthenticated(true);

      console.log("Sign in successful:", result.message);
      // Navigate to appropriate page after successful login
      navigate("/sessionsUser");
    } catch (error) {
      console.error("Sign in error", error);
      throw error; // Let the form handle the error display
    }
  };

  const handleRegister = async (formData) => {
    console.log("Register attempt with:", formData);

    // Registration is not implemented in the backend yet
    throw new Error(
      "Registrering är inte tillgänglig ännu. Kontakta administratören för att skapa ett konto."
    );
  };

  const handleLogout = async () => {
    try {
      await signOut();

      // Clear authentication state immediately
      setIsAuthenticated(false);
      setOpen(false);
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error", error);
      // Even if logout fails on server, clear local data
      localStorage.removeItem("session");
      setIsAuthenticated(false);
      setOpen(false);
      navigate("/");
    }
  };

  return (
    <div className="menu-container">
      <button
        id="btn-menu"
        className={`btn-menu ${open ? "menu-active" : ""}`}
        onClick={handleToggle}
      >
        <img src={menuIcon} alt="Menu" />
      </button>

      {open && (
        
        <div className="dropdown-menu">
          {!isAuthenticated ? (
            <button className="menu-item" onClick={handleSignInClick}>
              <IoLogIn className="menu-icon" /> Logga in
            </button>
          ) : (
            isAdminMode ? (
              <nav className="dropdown-menu">
                <NavLink to="/sessionsAdmin" className="menu-item" onClick={() => setOpen(false)}>
                  <FaCalendarAlt className="menu-icon" /> Alla Pass
                </NavLink>
                <NavLink to="/createsessions" className="menu-item" onClick={() => setOpen(false)}>
                  <FaCalendarAlt className="menu-icon" /> Skapa Pass
                </NavLink>
                <button className="menu-item logout-btn" onClick={handleLogout}>
                  <IoLogOut className="menu-icon" /> Logga ut
                </button>
              </nav>
            )
          : (
              <nav className="dropdown-menu">
                <NavLink to="/sessionsUser" className="menu-item" onClick={() => setOpen(false)}>
                  <FaCalendarAlt className="menu-icon" /> Alla Pass
                </NavLink>
                <NavLink to="/bookings" className="menu-item" onClick={() => setOpen(false)}>
                  <FaCalendarAlt className="menu-icon" /> Mina Bokningar
                </NavLink>
                <button className="menu-item logout-btn" onClick={handleLogout}>
                  <IoLogOut className="menu-icon" /> Logga ut
                </button>
              </nav>
            )
          )}
        </div>
      )}

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
        onRegister={handleRegister}
      />
    </div>
  );
};
