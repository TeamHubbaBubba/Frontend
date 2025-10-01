import React, { useState } from 'react'
import './UserBookingsPage.css'

export const UserBookingsPage = () => {
  // const [bookings, setBookings] = useState([]);
  const [bookings, setBookings] = useState([
    { id: 1, title: "Morning Cardio", date: "2025-10-02", time: "07:00 - 08:00" },
    { id: 2, title: "Strength Training", date: "2025-10-03", time: "09:00 - 10:00" }
  ])

  return (
    <div className='user-bookings-page'>

      <h1 className='bookings-title'>Dina bokade pass</h1>
      {bookings.length === 0 ? (
        <div className='card no-bookings'>
          <p>Obs! Du har inte bokat ett pass! Besök sessionssidan och boka en plats idag!</p>
        </div>
      )
    : (
        <div className='bookings-grid'>
          {bookings.map(booking => {
            return (
              <div key={booking.id} className="card booking">
                <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
                <div className='booking-info'>
                  <h3 className='booking-event-title'>{booking.title}</h3>
                  <div className='date-time'>
                    <p className='booking-date'>{booking.date}</p>
                    <p className='booking-time'>{booking.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
          </div> 
        )}
    </div>
  )
}
