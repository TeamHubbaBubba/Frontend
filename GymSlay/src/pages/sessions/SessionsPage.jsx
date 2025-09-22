import React from 'react'
import './sessionsPage.css'

export const SessionsPage = () => {
  return (
    <>
        <div className="card">
            <img></img>
            <div>
                <div className="title">Titel</div>
                <div className="spots">Platser</div>
            </div>
            <div className="intensity"></div>
            <div>
                <button className="btn">Anmäl</button>
                <button className="btn">Avanmäl</button>
            </div>
        </div>
    </>
  )
}
