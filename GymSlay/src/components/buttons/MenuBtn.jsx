import React, { useState } from 'react'
import { IoLogOut } from "react-icons/io5"
import { FaCalendarAlt } from "react-icons/fa"
import menuIcon from '../../assets/images/MenuBtn.svg'
import './buttons.css'
import { useNavigate } from 'react-router-dom'

export const MenuBtn = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleToggle = () => setOpen(!open)

  const handleLogout = async () => {
  try {
    const response = await fetch("https://localhost:7067/api", {
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
