import React, { useEffect, useState } from 'react';
import './sessionsPage.css';
import '../../components/buttons/buttons.css';
import { FaChevronDown } from 'react-icons/fa6';
import { API_URL } from '../../services/api';
import { NavLink, useNavigate } from 'react-router';

export const SessionsPageAdmin = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);
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
  
    const navigate = useNavigate();

    const getSessionInfo = () => sessions.find(session => session.id === sessionId);

    useEffect(() => {
        handleFetch();
    }, []);

    const toggleExpand = (id) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    const openDeleteModal = (id) => {
        setSessionId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/Sessions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setSessions(sessions.filter(session => session.id !== id));
            }
            closeDeleteModal();
        } catch (error) {
            console.error(`Error deleting session with id: ${id}`, error);
        }
    };

    async function handleFetch() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/sessions`);
            if (!response.ok) {
                setError(response.statusText);
                setLoading(false);
                return;
            }
            const data = await response.json();
            setSessions(data.data);
        } catch (error) {
            setError(error.message);
        } finally {
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
                    const dateTime = new Date(session.date);
                    const date = dateTime.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const isExpanded = expandedCardId === session.id;

                    return (
                        <div key={session.id} className={`card ${isExpanded ? "expanded" : ""}`}>
                            {/* Chevron-knapp som alltid är synlig */}
                            <button className={`btn-chevron ${isExpanded ? "rotate" : ""}`} onClick={() => toggleExpand(session.id)}>
                                <FaChevronDown />
                            </button>

                            {!isExpanded ? (
                                <>
                                    <img className="image" src={session.thumbnail || "/src/assets/images/girl-training.jpg"} alt={session.title || "Training session image."} />

                                    {(isTablet || isDesktop) ? (
                                        <div className="card-content-group">
                                            <div className="content-top">
                                                <div className="title">{session.title}</div>
                                                <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                            </div>
                                            <div className="time">{date} kl: {time}</div>
                                            <div className="content-bottom">
                                                <div className="intensity">Intensitet: {session.intensity || "Medium"}</div>
                                                <div className="buttons">
                                                    <button className="btn-edit" onClick={() => navigate(`/editsession/${session.id}`)}>Edit</button>
                                                    <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
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
                                                    <button className="btn-edit" onClick={() => navigate(`/editsession/${session.id}`)}>Edit</button>
                                                    <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
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
                                                <div className="expanded-bottom">
                                                    <div className="intensity">Intensitet: {session.intensity || "Medium"}</div>
                                                    <div className="buttons">
                                                    <button className="btn-edit" onClick={() => navigate(`/editsession/${session.id}`)}>Edit</button>
                                                        <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                                    </div>
                                                </div>
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
                                            <div className="expanded-bottom">
                                                <div className="spots">
                                                    Platser: {session.currentParticipants}/{session.maxParticipants}
                                                </div>
                                                <div className="buttons">
                                                    <button className="btn-edit" onClick={() => navigate(`/editsession/${session.id}`)}>Edit</button>
                                                    <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}

                {showDeleteModal && (
                    <div id="delete-modal">
                        <div className='delete-modal-content'>
                            <h2>{getSessionInfo()?.title}</h2>
                            <p>Are you sure you want to delete this session?</p>
                            <div className='delete-modal-actions'>
                                <button className='delete-confirm' onClick={() => handleDelete(sessionId)}>Yes</button>
                                <button className='delete-cancel' onClick={closeDeleteModal}>No</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <NavLink to="/createsessions" className="add-session-btn">Lägg till nytt pass</NavLink>
        </div>
    );
};
