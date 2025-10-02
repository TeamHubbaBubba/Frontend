import React, { useState, useEffect } from 'react'
import { MenuBtn } from '../buttons/MenuBtn'
import './header.css'
import { Link, useLocation } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5"


export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px som breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Automatiskt sätt admin-läge baserat på nuvarande sida
  useEffect(() => {
    const isOnAdminPage = location.pathname.includes('Admin') || location.pathname.includes('createsessions');
    setIsAdminMode(isOnAdminPage);
  }, [location.pathname]);
  
  // Olika menyalternativ för user vs admin
  const getUserNavLinks = () => (
    <>
      <Link to="/sessionsUser" className="nav-link">Sessions</Link>
      <Link to="/bookings" className="nav-link">Mina Bokningar</Link>
    </>
  );

  const getAdminNavLinks = () => (
    <>
      <Link to="/sessionsAdmin" className="nav-link">Hantera Sessions</Link>
      <Link to="/createsessions" className="nav-link">Skapa Session</Link>
      <Link to="/bookings/admin" className="nav-link">Alla Bokningar</Link>
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
              <IoLogOut /> Logga ut
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
