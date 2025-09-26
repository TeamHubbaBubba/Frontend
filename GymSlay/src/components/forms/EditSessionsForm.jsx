import { useState } from "react";
import "./forms.css"

export const EditSessionsForm = ({ session, onSave}) =>{
    const [title, setTitle] = useState(session?.title || "")
    const [description, setDescription] = useState(session?.description || "")
    const [sessionDate, setSessionDate] = useState(session?.date || "")
    const [maxParticipants, setMaxParticipants] = useState(session?.maxParticipants || "")
    const [intensity, setIntensity] = useState(session?.intensity || "")

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedSession = {
            ...session,
            title,
            description,
            date: sessionDate,
            maxParticipants,
            intensity
        }
        onSave(updatedSession)
    }

    return (
        <form className="edit-session-form" onSubmit={handleSubmit}>
            <div className="edit-form-title">Edit Session</div>

            <div className="form-group">
                <label htmlFor="title">Titel</label>
                <input type="text" 
                    id="title" 
                    className="form-input" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Beskrivning</label>
                <textarea 
                    id="description"
                    className="form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="sessionsDate">Tid</label>
                <input 
                    type="datetime-local"
                    id="sessionDate"
                    className="form-input"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="maxParticipants">Max antal deltagare</label>
                <input 
                    type="number"
                    id="maxParticipants"
                    className="form-input"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="intensity">Intensitet</label>
                <input 
                    type="text"
                    id="intensity"
                    className="form-input"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)} 
                />
            </div>

            <button type="submit" className="btn edit-btn-save">Spara</button>
        </form>
    )
}