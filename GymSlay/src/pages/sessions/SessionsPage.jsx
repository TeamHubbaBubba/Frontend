import React from 'react'
import './sessionsPage.css'

export const SessionsPage = () => {
  return (
    <>
        <div className="card">
            <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
            <div className="card-content-group">
                <div className="title">Titel</div>
                <div className="spots-group">
                    <div className="spots">Platser: 24</div>
                    <div className="progress-bar"></div>
                </div>
            </div>
            <div className="intensity">Nybörjare</div>
            <div className="buttons-group">
                <button className="btn-chevron"></button>
                <button className="btn-booking">Boka</button>
            </div>
        </div>
    </>
  )
}
