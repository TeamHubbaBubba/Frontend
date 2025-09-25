import React, { useEffect, useState } from 'react'
import './sessionsPage.css'
import { FaChevronDown } from 'react-icons/fa6';
import { CgClose } from 'react-icons/cg';

export const SessionsPageUser = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        handleFetch();
    }, []);

    const handleClick = (e) => {
        e.currentTarget.classList.toggle("rotate");
    }

    async function handleFetch() {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('https://localhost:7067/api/sessions');

            if(!response.ok) {
                console.log("Fetch failed", response.statusText);
                setError(response.statusText);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setSessions(data.data);
            console.log('Sessions fetched:', data.data);
 
        }
        catch (error) {
            console.error("Error fetching sessions:", error);
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

    else if (!sessions || sessions.length === 0) {

        return (
            <div className="wrapper">
                <div className="message">Inga sessioner hittades</div>
            </div>
        )
    }
 

    return (
        <>
            <div className="wrapper">
                {sessions.map(session => {
                    return (
                    <div key={session.id} className="card">
                        <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
                        <div className="card-content-group">
                            <div className="title">{session.title}</div>
                            <div className="details-group">
                                <div className="intensity">{session.intensity}</div>
                                <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                  
                                {/* <div className="progress-bar"></div> */}
                            </div>
                        </div>
                        <div className="buttons-group">
                        
                            <button className="btn-chevron" onClick={handleClick}>
                                <FaChevronDown />
                            </button>
                            <div className="buttons">
                                <button className="btn-booking">Boka</button>
                            </div>
                        </div>
                    </div>
                    )
                })}

            </div>
        </>
    )  
}
