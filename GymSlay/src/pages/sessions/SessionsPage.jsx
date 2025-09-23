import React, { useEffect, useState } from 'react'
import './sessionsPage.css'
import { FaChevronDown } from 'react-icons/fa6';

export const SessionsPage = () => {
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
            const response = await fetch('http://localhost:7067/api/session');

            if(!response.ok) {
                console.log("Fetch failed", response.statusText);
                setError(response.statusText);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setSessions(data);
            console.log('Sessions fetched:', data);
 
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
        return <div className="message">Loading...</div>;
    }
    
    else if (error) {
        return <div className="message error">Något gick fel... Försök igen senare.</div>;
    }

    else if (!sessions || sessions.length === 0) {
        return <div className="message">Inga sessioner hittades</div>;
    }

    return (
        <>
            <div className="wrapper">
                {sessions.map(session => {
                    return (
                    <div key={session.Id} className="card">
                        <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training."></img>
                        <div className="card-content-group">
                            <div className="title">{session.Title}</div>
                            <div className="details-group">
                                <div className="intensity">{session.Intensity}</div>
                                <div className="spots">Platser: {session.CurrentParticipants}/{session.MaxParticipants}</div>
                                {/* <div className="progress-bar"></div> */}
                            </div>
                        </div>
                        <div className="buttons-group">
                            <button className="btn-chevron" onClick={handleClick}>
                                <FaChevronDown />
                            </button>
                            <button className="btn-booking">Boka</button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </>
    )  
}
