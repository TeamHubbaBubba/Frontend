import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./forms.css";

export const EditSessionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`https://localhost:7067/api/sessions/${id}`);
                if (!response.ok) throw new Error("Failed to fetch session");
                const data = await response.json();
                setSession(data.data);
                console.log(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSession();
    }, [id]);

    if (!session) return <p>Laddar...</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7067/api/sessions/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(session),
            });
            if (!response.ok) throw new Error("Update failed");
            navigate("/sessionsadmin");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="session-form" onSubmit={handleSubmit}>
            <div className="form-title">Edit Session</div>

            <div className="form-group">
                <label htmlFor="title">Titel</label>
                <input 
                    className="form-input"
                    type="text"
                    id="title"
                    value={session.title || ""} 
                    onChange={(e) => setSession({ ...session,title: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Beskrivning</label>
                <textarea 
                    className="form-input"
                    id="description"
                    value={session.description || ""}
                    onChange={(e) => setSession({ ...session, description: e.target.value})}
                />
            </div>

            <div className="form-group">  
                <label htmlFor="date">Tid</label>
                <input 
                    className="form-input"
                    type="datetime-local" 
                    id="date" 
                    name="date" 
                    value={session.date || ""}
                    onChange={(e) => setSession({ ...session, date: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label htmlFor="intensity">Intensitet</label>
                <input 
                    className="form-input"
                    type="text"
                    id="intensity"
                    value={session.intensity || ""}
                    onChange={(e) => setSession({ ...session, intensity: e.target.value })} 
                />
            </div>

            <div className="form-group">
                <label htmlFor="maxParticipants">Max Deltagare</label>
                <input 
                    className="form-input"
                    type="number"
                    id="maxParticipants"
                    value={session.maxParticipants || ""}
                    onChange={(e) => setSession({ ...session, maxParticipants: e.target.value })} 
                />
            </div>

            <button type="submit" className="btn-submit">Spara</button>
        </form>
    )
}