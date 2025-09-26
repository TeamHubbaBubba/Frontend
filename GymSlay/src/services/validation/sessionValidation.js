 export function validate({ title, description, intensity, sessionDate, maxParticipants }) {
    const errors = {};

    if (!title.trim()) errors.title = "Titel är obligatoriskt";
    if (!description.trim()) errors.description = "Beskrivning är obligatoriskt";

    if (!intensity.trim()) errors.intensity = "Intensitet är obligatoriskt";
    if (!sessionDate) errors.sessionDate = "Datum och tid måste anges";
    else if (new Date(sessionDate) < new Date()) 
      errors.sessionDate =  "Datum och tid måste vara i framtiden";

    const mp = Number(maxParticipants);
    if (!mp) errors.maxParticipants = "Ange max antal platser";
    else if (mp < 1) errors.maxParticipants = "Minst 1 plats måste anges";

    return errors;
}