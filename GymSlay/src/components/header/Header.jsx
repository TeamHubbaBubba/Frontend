import React, { useState, useEffect } from 'react'
import { MenuBtn } from '../buttons/MenuBtn'
import './header.css'
import { Link, useLocation } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5"


export const Header = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const location = useLocation();

  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 1024); 
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
      <Link to="/sessionsUser" className="nav-link">
        <p>Alla Pass</p>
      </Link>
      <Link to="/bookings" className="nav-link">
        <p>Mina Bokningar</p>
      </Link>
    </>
  );

  const getAdminNavLinks = () => (
    <>
      <Link to="/sessionsAdmin" className="nav-link">
        <p>Alla Pass</p>
      </Link>
      <Link to="/createsessions" className="nav-link">
        <p>Skapa Pass</p>
      </Link>
    </>
  );

  return (
    <header className='header'>
      <div className="navbar-spacer">
        <Link to="/">
          <img src="./images/logo.png" alt="GymSlay Logo" className='logo'/>
        </Link>

        {!isDesktop ? (
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
