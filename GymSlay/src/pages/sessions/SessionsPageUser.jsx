import React, { useEffect, useState } from 'react'
import './sessionsPage.css'
import '../../components/buttons/buttons.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { API_URL, bookSession, getSession } from '../../services/api';

export const SessionsPageUser = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [bookedSessions, setBookedSessions] = useState([]); // id:n för bokade pass

    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const checkScreenSize = () => {
        setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); 
        setIsDesktop(window.innerWidth >= 1024); 
    };      

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    async function handleBook(id) {
        try {
            setLoading(true);
            setError(null);

            const result = await bookSession(id);
            let data = null;

            try { data = await result.json(); } catch {}

            if (result.status === 200 && data?.success === true) {
                setBookedSessions(prev => [...prev, id]); // Lägg till id för bokat pass

                try {
                    const refreshed = await getSession(id);
                    if (refreshed.ok) {
                        const freshJson = await refreshed.json();
                        const fresh = freshJson && freshJson.data ? freshJson.data : freshJson;
                        setSessions(prev => prev.map(s => (s.id === id ? fresh : s)));
                    }
                } catch {}
            } else if (result.status === 400 && data?.success === false) {
                setError("Kunde inte boka passet.");
            } else if (result.status === 401) {
                setError("Du måste vara inloggad för att boka.");
            } else {
                setError("Något gick fel, försök igen.");
            }
        } catch (error) {
            setError("Nätverksfel, försök igen.", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const toggleExpand = (id) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    async function handleFetch() {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_URL}/sessions`, {
                credentials: "include"
            });

            if(!response.ok) {
                setError(response.statusText);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setSessions(data.data);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    
    if (loading) return <div className="list-container"><div className="message">Loading...</div></div>;
    if (error) return <div className="list-container"><div className="message error">Något gick fel... Försök igen senare.</div></div>;
    if (!sessions || sessions.length === 0) return <div className="list-container"><div className="message">Inga sessioner hittades.</div></div>;

    return (
        <div className="sessions-page">
            <div className="list-container">
                {sessions.map(session => {
                    const isExpanded = expandedCardId === session.id;
                    const dateTime = new Date(session.date);
                    const date = dateTime.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const isFull = session.currentParticipants >= session.maxParticipants;
                    const isBooked = bookedSessions.includes(session.id);

                    return (
                        <div key={session.id} className={`card ${isExpanded ? "expanded" : ""}`}>
                            {/* Chevron-knapp som alltid är synlig */}
                            <button className={`btn-chevron ${isExpanded ? "rotate" : ""}`} onClick={() => toggleExpand(session.id)}>
                                <FaChevronDown />
                            </button>

                            {!isExpanded && (
                                <>
                                    <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />
                                        
                                    {(isTablet || isDesktop) ? (
                                        <>                                        
                                            <div className="card-content-group">
                                                <div className="content-top">
                                                    <div className="title">{session.title}</div>
                                                    <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                                </div>
                                                <div className="time">{date} kl: {time}</div>
                                                <div className="content-bottom">
                                                    <div className="intensity">Intensitet: {session.intensity || "Medium"}</div>
                                                    <button className="btn-booking" onClick={() => handleBook(session.id)}
                                                        disabled={isFull || loading || isBooked}>
                                                        {isFull ? "Fullbokat" : isBooked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                        )
                                        : (
                                            <div className="card-content-group">
                                                <div className="title">{session.title}</div>
                                                <div className="time">{date} kl: {time}</div>
                                                <div className="content-bottom">
                                                    <div className="intensity">{session.intensity || "Medium"}</div>
                                                    <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                                    <button className="btn-booking" onClick={() => handleBook(session.id)}
                                                        disabled={isFull || loading || isBooked}>
                                                        {isFull ? "Fullbokat" : isBooked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                </>
                            )}

                            {isExpanded && (
                                <div>
                                    {isTablet ? (
                                        <div className="expanded-top">
                                            <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />
                                            <div className="card-content-group">
                                                <div className="content-top">
                                                    <div className="title">{session.title}</div>
                                                    <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                                </div>
                                                <div className="time">{date} kl: {time}</div>
                                                <div className="description">{session.description}</div>
                                                <div className="content-bottom">
                                                    <div className="intensity">Intensitet: {session.intensity || "Medium"}</div>
                                                    <button className="btn-booking" onClick={() => handleBook(session.id)}
                                                        disabled={isFull || loading || isBooked}>
                                                        {isFull ? "Fullbokat" : isBooked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                                    </button>
                                                </div>
                                                {error && <p className="error-text">{error}</p>}
                                                {isBooked && <p className="success-text">Passet är bokat! Slay!</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="expanded-top">
                                                <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />
                                                <div className="card-content-group">
                                                    <div className="title">{session.title}</div>
                                                    <div className="time">{date} kl: {time}</div>
                                                    <div className="intensity">Intensitet: {session.intensity || "Medium"}</div>
                                                </div>
                                            </div>
                                            <div className="description">{session.description}</div>
                                            <div className="content-bottom">
                                                <div className="spots">
                                                    Platser: {session.currentParticipants}/{session.maxParticipants}
                                                </div> 
                                                <div className="buttons">
                                                    <button 
                                                        className="btn-booking"
                                                        onClick={() => handleBook(session.id)}
                                                        disabled={isFull || loading || isBooked}
                                                        >
                                                        {isFull ? "Fullbokat" : isBooked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                                    </button>
                                                </div>
                                                {error && <p className="error-text">{error}</p>}
                                                {isBooked && <p className="success-text">Passet är bokat! Slay!</p>}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="booking-info">
                <p>Ring för att boka:</p> 
                <strong>054-123 456</strong>
            </div>
        </div>
    )
}
