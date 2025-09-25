import React, { useEffect, useState } from 'react'
import './sessionsPage.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { API_URL } from '../../services/api';

export const SessionsPageUser = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);

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
            const response = await fetch(`${API_URL}/sessions`);

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

    if (loading) {
        return (
            <div className="wrapper">
                <div className="message">Loading...</div>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="wrapper">
                <div className="message error">Något gick fel... Försök igen senare.</div>
            </div>
        )
    }

    if (!sessions || sessions.length === 0) {
        return (
            <div className="wrapper">
                <div className="message">Inga sessioner hittades</div>
            </div>
        )
    }

    return (
        <div className="wrapper">
            {sessions.map(session => {
                const isExpanded = expandedCardId === session.id;
                return (
                    <div key={session.id} className={`card ${isExpanded ? "expanded" : ""}`}>
                        {!isExpanded && (
                            <>
                                <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title} />
                                <div className="card-content-group">
                                    <div className="title">{session.title}</div>
                                    <div className="details-group">
                                        <div className="intensity">{session.intensity || "Medium"}</div>
                                        <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                    </div>
                                </div>
                                <div className="buttons-group">
                                    <button className={`btn-chevron ${isExpanded ? "rotate" : ""}`} onClick={() => toggleExpand(session.id)}>
                                        <FaChevronDown />
                                    </button>
                                    <div className="buttons">
                                        <button className="btn-booking">Boka</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {isExpanded && (
                            <div className="expanded-content">
                                <div className="expanded-top">
                                    <div className="expanded-info">
                                        <div className="expanded-title">{session.title}</div>
                                        <div className="expanded-time">Time: {session.time}</div>
                                        <div className="expanded-intensity">Intensity: {session.intensity || "Medium"}</div>
                                    </div>
                                </div>

                                <div className="expanded-description">{session.description}</div>

                                <div className="expanded-bottom">
                                    <div className="expanded-spots">
                                        Platser: {session.currentParticipants}/{session.maxParticipants}
                                    </div>
                                    <button className="btn-booking expanded-btn">Boka</button>
                                </div>

                                
                                <button className="btn-chevron expanded-close" onClick={() => toggleExpand(session.id)}>
                                    <FaChevronUp />
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}
