import {useState} from "react"
import "./forms.css"
import { createSession } from "../../services/api"

export const CreateSessionForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      title,
      description,
      maxParticipants: Number(maxParticipants),
      sessionDate
    }

    try {
      const response = await createSession(payload)

      if (response.ok) {
        const data = await response.json()
        console.log("Session created:", data)
      } else {
        console.error("Failed to create session")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

    return (
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="form-title">Add Session</div>
        
        <div className="form-group">  
          <label htmlFor="title">Titel</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            className="form-input" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">  
          <label htmlFor="description">Beskrivning</label>
          <textarea 
            id="description" 
            name="description" 
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">  
          <label htmlFor="sessionDate">Tid</label>
          <input 
          type="datetime-local" 
          id="sessionDate" 
          name="sessionDate" 
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
            name="maxParticipants" 
            className="form-input"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Spara</button>
      </form>
    )
}