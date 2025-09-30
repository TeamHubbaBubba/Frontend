import React, { useState } from 'react'
import { IoLogOut } from "react-icons/io5"
import { FaCalendarAlt } from "react-icons/fa"
import menuIcon from '../../assets/images/MenuBtn.svg'
import './buttons.css'

export const MenuBtn = () => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(!open)

  const handleLogout = () => {
    localStorage.removeItem('session')
    localStorage.removeItem('token')
    setOpen(false)
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
        <div className="dropdown-menu">
          <button className="menu-item">
            <FaCalendarAlt className="menu-icon" /> Bokningar
          </button>
          <button className="menu-item logout-btn" onClick={handleLogout}>
            <IoLogOut className="menu-icon" /> Logga ut
          </button>
        </div>
      )}
    </div>
  )
}
