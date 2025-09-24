import React, { useEffect, useState } from 'react'
import './sessionsPage.css'
import { FaChevronDown } from 'react-icons/fa6';

export const SessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const getSessionInfo = () => {
    return sessions.find(session => session.id === sessionId);
  };

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
  // Const to show the delete modal
  const openDeleteModal = (id) => {
    console.log(`Open delete modal for session with id: ${id}`);
    setSessionId(id);
    setShowDeleteModal(true);
  };

  // Const to hide the delete modal
  const closeDeleteModal = () => {
    console.log(`Close delete modal`);
    setShowDeleteModal(false);
  };

  // Const to handle the deletion of the session
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7067/api/Sessions/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setSessions(sessions.filter(session => session.id !== id));
        console.log(`Deleted session with id: ${id}`);
      }
      closeDeleteModal();
    } catch (error) {
      console.error(`Error deleting session with id: ${id}`, error);
    }
  };

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
                            <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>X</button>
                        </div>
                    </div>
                    )
                })}
                      {showDeleteModal && (
        <div id="delete-modal">
          <div className='delete-modal-content'>
            <h2>{getSessionInfo()?.title}</h2>
            <p>Are you sure you want to delete this session?</p>
            <div className='delete-modal-actions'>
              <button className='delete-confirm' onClick={() => {handleDelete(sessionId);}}>Yes</button>
              <button className='delete-cancel' onClick={closeDeleteModal}>No</button>
            </div>
          </div>
        </div>
      )}

            </div>
        </>
    )  
}
