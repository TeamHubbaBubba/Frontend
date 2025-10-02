import React, { useState, useEffect } from 'react'
import { MenuBtn } from '../buttons/MenuBtn'
import './header.css'
import { Link, useLocation } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5"


export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const location = useLocation();

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768); // 768px som breakpoint
  };
  
  useEffect(() => {

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sätt admin-läge automatiskt baserat på nuvarande sida
  useEffect(() => {
    const isOnAdminPage = location.pathname.includes('Admin') || location.pathname.includes('createsessions');
    setIsAdminMode(isOnAdminPage);
  }, [location.pathname]);
  
  // Olika menyalternativ för user vs admin
  const getUserNavLinks = () => (
    <>
      <Link to="/sessionsUser" className="nav-link">Alla Sessions</Link>
      <Link to="/bookings" className="nav-link">Mina Bokningar</Link>
    </>
  );

  const getAdminNavLinks = () => (
    <>
      <Link to="/sessionsAdmin" className="nav-link">Alla Sessions</Link>
      <Link to="/createsessions" className="nav-link">Skapa Session</Link>
    </>
  );

  return (
    <header className='header'>
      <div className="navbar-spacer">
        <Link to="/">
          <img src="./images/logo.png" alt="GymSlay Logo" className='logo'/>
        </Link>

        {isMobile ? (
          <MenuBtn />
        ) : (
          <nav className="navbar">
            {isAdminMode ? getAdminNavLinks() : getUserNavLinks()}
            <Link to="/logout" className="nav-link">
              Logga ut
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
