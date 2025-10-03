import React, { useEffect, useState } from 'react'
import { IoLogOut } from "react-icons/io5"
import { FaCalendarAlt } from "react-icons/fa"
import menuIcon from '../../assets/images/MenuBtn.svg'
import './buttons.css'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { API_URL } from '../../services/api'

export const MenuBtn = () => {
  const [open, setOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isOnAdminPage = location.pathname.includes('Admin') || location.pathname.includes('createsessions');
    setIsAdminMode(isOnAdminPage);
  }, [location.pathname]);

  const handleToggle = () => setOpen(!open)

  const handleLogout = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })

    if (response.ok) {
      localStorage.removeItem('session')
      localStorage.removeItem('token')
      setOpen(false)
      navigate('/signin')
      // testing
      console.log("Logout successful")
    } else {
      console.error("Logout failed", response.status)
    }
  } catch (error) {
    console.error("Logout error", error)
  }
}


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
  )
}
