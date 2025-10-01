 export function validate({ title, description, sessionDate, maxParticipants }) {
    const errors = {};

    if (!title.trim()) errors.title = "Titel är obligatoriskt";
    if (!description.trim()) errors.description = "Beskrivning är obligatoriskt";


    const now = new Date();
    const selected = new Date(sessionDate);

    if (!sessionDate) {
      errors.sessionDate = "Datum och tid måste anges";
    } else if (isNaN(selected.getTime())) {
      errors.sessionDate = "Ogiltigt datum/tid"
    } else if (selected <= now) {
      errors.sessionDate = "Datum och tid måste vara i framtiden";
    }

    const mp = Number(maxParticipants);
    if (!mp) errors.maxParticipants = "Ange max antal platser";
    else if (mp < 1) errors.maxParticipants = "Minst 1 plats måste anges";

    return errors;
}