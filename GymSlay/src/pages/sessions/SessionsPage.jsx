import React, { useEffect, useState } from 'react';
import './SessionsPage.css';

const SessionsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([
    { id: 1, title: "Morning Cardio" },
    { id: 2, title: "Strength Training" }
  ]);

  //  const [sessions, setSessions] = useState([]);
  // useEffect(() => {
  //   fetch('/api/sessions')
  //     .then(res => res.json())
  //     .then(data => setSessions(data));
  //     .catch(error => console.error('Error fetching sessions:', error));
  // }, []);

  const getSessionInfo = () => {
    return sessions.find(session => session.id === sessionId);
  };

  const openDeleteModal = (id) => {
    console.log(`Open delete modal for session with id: ${id}`);
    setSessionId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    console.log(`Close delete modal`);
    setShowDeleteModal(false);
  };

  const handleDelete = (id) => {
    console.log(`Deleted session with id: ${id}`);
    setSessions(sessions.filter(session => session.id !== id));
    closeDeleteModal();
  };

  // const handleDelete= async (id) => {
  //   try{
  //     await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
  //     setSessions(sessions.filter(session => session.id !== id));
  //     closeDeleteModal();
  //   } catch (error) {
  //     console.error(`Error deleting session with id: ${id}`, error);
  //   }
  // };

  return (
    <div className="sessions-page">
      
      <div className="card-container">
        {sessions.map(session => (
          <div key={session.id} className="card">
            <h3 className="title">{session.title}</h3>
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