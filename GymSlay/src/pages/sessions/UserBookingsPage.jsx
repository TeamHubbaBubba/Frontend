import React, { useEffect, useState } from 'react'
import './UserBookingsPage.css'

export const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    localStorage.setItem
  })

  const formatDate = (string) => {
    const date = new Date(string);
    const dateSection = date.toLocaleDateString('en-GB', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    const timeSection = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${dateSection} - ${timeSection}`;
  }

  async function handleFetch() {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://localhost:7067/api/bookings/current-user', {
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      });

      if(!response.ok) {
        console.log("Fetch failed", response.statusText);
        setError(response.statusText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setBookings(data.data);
      console.log('Bookings fetched:', data.data);

    }
    catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="wrapper">
        <div className="message">Loading...</div>
      </div>
    )
  }
  else if (error) {
    return (
      <div className="wrapper">
        <div className="message error">Något gick fel... Försök igen senare.</div>
      </div>
    )
  }
  else if (bookings.length === 0) {
    return (
      <div className='card no-bookings'>
        <p>Obs! Du har inte bokat ett pass! Besök sessionssidan och boka en plats idag!</p>
      </div>
    )
  }

  return (
    <div className='user-bookings-page'>

      <h1 className='bookings-title'>Dina bokade pass</h1>
      <div className='bookings-grid'>
        {bookings.map(booking => {
          return (
            <div key={booking.id} className="card booking">
              <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
              <div className='booking-info'>
                <h3 className='booking-event-title'>{booking.title}</h3>
                <div className='date-time'>
                  <p className='booking-date'>{formatDate(booking.date)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
