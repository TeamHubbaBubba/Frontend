import React, { useEffect, useState } from 'react'
import './UserBookingsPage.css'

export const UserBookingsPage = () => {
  // const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([
    { id: 1, title: "Morning Cardio", date: "2025-10-02", time: "07:00 - 08:00" },
    { id: 2, title: "Strength Training", date: "2025-10-03", time: "09:00 - 10:00" }
  ])

  useEffect(() => {
    handleFetch();
  }, []);

  async function handleFetch() {
    setLoading(true);
    setError(null);
    
    try {
      // const response = await fetch('https://localhost:7067/api/bookings');
      const simulatedResponse = {
      ok: true,
      json: async () => ({
        data: [
          { id: 1, title: "Morning Cardio", date: "2025-10-02", time: "07:00 - 08:00" },
          { id: 2, title: "Strength Training", date: "2025-10-03", time: "09:00 - 10:00" }
        ]
      })
    };

    await new Promise(resolve => setTimeout(resolve, 2000));

      // if(!response.ok) {
      //   console.log("Fetch failed", response.statusText);
      //   setError(response.statusText);
      //   setLoading(false);
      //   return;
      // }

      if(!simulatedResponse.ok) {
        console.log("Fetch failed", simulatedResponse.statusText);
        setError(simulatedResponse.statusText);
        setLoading(false);
        return;
      }

      // const data = await response.json();
      const data = await simulatedResponse.json();
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
                  <p className='booking-date'>{booking.date}</p>
                  <p className='booking-time'>{booking.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
