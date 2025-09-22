import React, { useEffect, useState } from 'react';
import './sessionsPage.css';

const SessionsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);

  // Fetch sessions from the API
  useEffect(() => {
    fetch('https://localhost:7067/api/Sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  const getSessionInfo = () => {
    return sessions.find(session => session.id === sessionId);
  };

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
    <div className="sessions-page">
      
      <div className="card-container">
        {sessions.map(session => (
          <div key={session.id} className="card">
            <h3 className="title">{session.title}</h3>
            <p className="description">{session.description}</p>
            <p className="date">{new Date(session.date).toLocaleDateString()}</p>
            <button className='delete-btn' onClick={() => openDeleteModal(session.id)}>X</button>
          </div>
        ))}
      </div>
    
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

  );
};

export default SessionsPage;