import React, { useState } from "react";
import "./cards.css";

const EventCard = ({ session }) => {
  const [expanded, setExpanded] = useState(false);

  const percentFull = Math.min(
    (session.currentParticipants / session.maxParticipants) * 100,
    100
  );

  return (
    <div
      className={`event-card ${expanded ? "expanded" : "collapsed"}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Sammanfattning när den är mindre */}
      {!expanded && (
        <div className="event-summary">
          <img
            src={session.thumbnail || ""}
            alt={session.title}
            className="event-thumb-small"
          />
          <div className="event-info">
            <h3>{session.title}</h3>
            <p>
              {session.time} @ {session.location}
            </p>
          </div>
        </div>
      )}

      {/* Förstorar detaljvyn */}
      {expanded && (
        <div className="event-expanded">
          <img
            src={session.thumbnail || ""}
            alt={session.title}
            className="event-thumb-large"
          />
          <div className="event-info">
            <h3>{session.title}</h3>
            <p>
              {session.time} @ {session.location}
            </p>
          </div>
          <p className="event-description">{session.description}</p>

          
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentFull}%` }}
              ></div>
            </div>
            <p>
              {session.currentParticipants}/{session.maxParticipants} platser bokade
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
