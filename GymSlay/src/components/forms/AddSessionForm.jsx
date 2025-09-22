import {useState} from "react"
import "./forms.css"

export const SessionsForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sessionDate, setSessionDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      title,
      description,
      sessionDate
    }

    console.log("Payload skickas:", payload)
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

        <button type="submit" className="btn btn-primary">Spara</button>
      </form>
    )
}