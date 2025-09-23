import React, { useRef } from 'react'
import './sessionsPage.css'
import { FaChevronDown } from 'react-icons/fa6';

export const SessionsPage = () => {
    const chevronRef = useRef();

    const handleClick = () => {
        console.log("Clicked");
        chevronRef.current.classList.toggle("rotate");
    }

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
                <button ref={chevronRef} className="btn-chevron" onClick={handleClick}>
                    <FaChevronDown />
                </button>
                <button className="btn-booking">Boka</button>
            </div>
        </div>
    </>
  )
}
