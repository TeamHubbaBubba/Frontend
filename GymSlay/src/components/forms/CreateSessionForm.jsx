import {useState} from "react"
import { useNavigate } from "react-router"
import "./forms.css"
import { createSession } from "../../services/api"
import { validate } from "../../services/validation/sessionValidation"

export const CreateSessionForm = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [intensity, setIntensity] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formValues = { title, description, intensity, sessionDate, maxParticipants };
    const errorObject = validate(formValues);
    setErrors(errorObject);
    if (Object.keys(errorObject).length > 0) return;

    const payload = {
      title,
      description,
      intensity,
      maxParticipants: Number(maxParticipants),
      date: new Date(sessionDate).toISOString()
    }

    try {
      const response = await createSession(payload)
      if (response.ok) {
        console.log("Session created successfully!")
        // Clear form
        setTitle("")
        setDescription("")
        setIntensity("")
        setSessionDate("")
        setMaxParticipants("")
        // Redirect to sessions admin page
        navigate("/sessionsAdmin")
      } else {
        console.error("Failed to create session")
      }
    } catch (error) {
      console.error("Error creating session:", error)
    }
  }

  return (
    <div className="sessions-form">
      <h2>Skapa ny session</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            className={`form-input ${errors.title ? "error-box" : ""}`} 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Beskrivning</label>
          <textarea 
            id="description" 
            name="description" 
            className={`form-input ${errors.description ? "error-box" : ""}`} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="sessionDate">Datum och tid</label>
          <input 
            type="datetime-local" 
            id="sessionDate" 
            name="sessionDate" 
            className={`form-input ${errors.sessionDate ? "error-box" : ""}`} 
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
          />
          {errors.sessionDate && <p className="error-text">{errors.sessionDate}</p>}
        </div>

        <div className="form-group">  
          <label htmlFor="intensity">Intensitet</label>
          <input 
            type="text" 
            id="intensity" 
            name="intensity" 
            className={`form-input ${errors.intensity ? "error-box" : ""}`} 
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxParticipants">Max antal deltagare</label>
          <input 
            type="number" 
            id="maxParticipants" 
            name="maxParticipants" 
            className={`form-input ${errors.maxParticipants ? "error-box" : ""}`} 
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          />
          {errors.maxParticipants && <p className="error-text">{errors.maxParticipants}</p>}
        </div>

        <button type="submit" className="btn-submit">
          Skapa session
        </button>
      </form>
    </div>
  )
}