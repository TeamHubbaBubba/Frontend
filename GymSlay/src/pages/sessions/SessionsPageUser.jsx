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
    const [booked, setBooked] = useState(false);
    const [success, setSuccess] = useState(null);

    async function handleBook(id) {
        try {
            setLoading(true);
            setError(null);

            const result = await bookSession(id);
            let data = null;

            try { data = await result.json(); } catch {}

            if (result.status === 200 && data?.success === true) {
                setBooked(true);
                setSuccess("Passet är bokat!");

            try {
                const refreshed = await getSession(id);
                if (refreshed.ok) {
                    const freshJson = await refreshed.json();
                    const fresh = freshJson && freshJson.data ? freshJson.data : freshJson;
                    setSessions(prev => prev.map(s => (s.id === id ? fresh : s)));
                }
            } catch {

                }
            } else if (result.status === 400 && data?.success === false) {
                setError("Kunde inte boka passet.");
            } else if (result.status === 401) {
                setError("Du måste vara inloggad för att boka.");
            } else {
                setError("Något gick fel, försök igen.");
            }
        } catch (error) {
            setError("Nätverksfel, försök igen.");
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

                    return (
                        <div key={session.id} className={`card ${isExpanded ? "expanded" : ""}`}>
                            {/* Chevron-knapp som alltid är synlig */}
                            <button className={`btn-chevron ${isExpanded ? "rotate" : ""}`} onClick={() => toggleExpand(session.id)}>
                                <FaChevronDown />
                            </button>

                            {!isExpanded && (
                                <>
                                    <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />
                                    <div className="card-content-group">
                                        <div className="title">{session.title}</div>
                                        <div className="time">{date} kl: {time}</div>
                                        <div className="details-group">
                                            <div className="intensity">{session.intensity || "Medium"}</div>
                                            <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                        </div>
                                    </div>
                                    <div className="buttons-group">
                                        <div className="buttons">
                                            <button className="btn-booking" onClick={() => handleBook(session.id)}
                                                disabled={isFull || loading || booked}
                                            >
                                                {isFull ? "Fullbokat" : booked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {isExpanded && (
                                <>
                                    <div className="expanded-top">
                                        <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />
                                        <div className="card-content-group">
                                            <div className="title">{session.title}</div>
                                            <div className="time">{date} kl: {time}</div>
                                            <div className="intensity">{session.intensity || "Medium"}</div>
                                        </div>
                                    </div>

                                    <div className="description">{session.description}</div>

                                    <div className="expanded-bottom">
                                        <div className="spots">
                                            Platser: {session.currentParticipants}/{session.maxParticipants}
                                        </div> 
                                    </div>

                                    {error && <p className="error-text">{error}</p>}
                                    {booked && <p className="success-text">Passet är bokat! Slay!</p>}
                                    <div>
                                        <div className="buttons">
                                            <button 
                                                className="btn-booking-big"
                                                onClick={() => handleBook(session.id)}
                                                disabled={isFull || loading || booked}
                                            >
                                                {isFull ? "Fullbokat" : booked ? "Bokad" : loading ? "Bokar..." : "Boka"}
                                            </button>
                                        </div>
                                    </div>
                                </>
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
