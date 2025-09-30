import React from 'react'
import './UserBookingsPage.css'

export const UserBookingsPage = () => {
  return (
    <div className='user-bookings-page'>
      <div className='card no-bookings'>
        <p>Obs! Du har inte bokat ett pass! Besök sessionssidan och boka en plats idag!</p>
      </div>

      <div className="card booking">
        <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
        <div className="card-content-group">
            <div className="title">
              <h3>Morning Mobility</h3>
            </div>
            <div className='date-time'>
              <p className='date'>02/10/2025</p>
              <p className='time'>07:00 - 08:00</p>
            </div>
        </div>
      </div>
    </div>
  )
}
