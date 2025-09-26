import React, { useEffect, useState } from 'react';
import './sessionsPage.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { API_URL } from '../../services/api';

export const SessionsPageAdmin = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);

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

    if (loading) return <div className="wrapper"><div className="message">Loading...</div></div>;
    if (error) return <div className="wrapper"><div className="message error">Något gick fel... Försök igen senare.</div></div>;
    if (!sessions || sessions.length === 0) return <div className="wrapper"><div className="message">Inga sessioner hittades.</div></div>;

    return (
        <div className="wrapper">
            {sessions.map(session => {
                const dateTime = new Date(session.date);
                const date = dateTime.toISOString().split("T")[0];
                const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const isExpanded = expandedCardId === session.id;

                return (
                    <div key={session.id} className={`card ${isExpanded ? "expanded" : ""}`}>
                        {!isExpanded && (
                            <>
                                <img className="image" src="/src/assets/images/girl-training.jpg" alt="Girl training." />
                                <div className="card-content-group">
                                    <div className="title">{session.title}</div>
                                    <div className="time">{date} {time}</div>
                                    <div className="details-group">
                                        <div className="intensity">{session.intensity}</div>
                                        <div className="spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                    </div>
                                </div>
                                <div className="buttons-group">
                                    <button className={`btn-chevron ${isExpanded ? "rotate" : ""}`} onClick={() => toggleExpand(session.id)}>
                                        <FaChevronDown />
                                    </button>
                                    <div className="buttons">
                                        <button className="btn-edit">Edit</button>
                                        <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                    </div>
                                </div>
                            </>
                        )}

                        
                        {isExpanded && (
                            <div className="expanded-content">
                                <div className="expanded-top">
                                    <button className="btn-chevron expanded-close" onClick={() => toggleExpand(session.id)}>
                                        <FaChevronUp />
                                    </button>
                                    <div className="expanded-info">
                                        <div className="expanded-title">{session.title}</div>
                                        <div className="expanded-time">Date: {date} {time}</div>
                                        <div className="expanded-intensity">Intensity: {session.intensity}</div>
                                    </div>
                                </div>

                                <div className="expanded-description">{session.description}</div>

                                <div className="expanded-bottom">
                                    <div className="expanded-spots">Platser: {session.currentParticipants}/{session.maxParticipants}</div>
                                    <div className="buttons">
                                        <button className="btn-edit">Edit</button>
                                        <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
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
    );
};
