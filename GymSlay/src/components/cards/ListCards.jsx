import React from "react";
import EventCard from "./EventCard";
import "./cards.css";

const mockSessions = [
  {
    id: 1,
    title: "Styrketräning",
    time: "10:00",
    location: "Gymslay",
    description: "Styrketräning för alla nivåer",
    thumbnail: "",
    currentParticipants: 3,
    maxParticipants: 10,
  },
  {
    id: 2,
    title: "Cardio",
    time: "12:00",
    location: "Gymslay",
    description: "Cardioträning för alla nivåer",
    thumbnail: "",
    currentParticipants: 7,
    maxParticipants: 10,
  },
  {
    id: 3,
    title: "Calisthenics",
    time: "18:00",
    location: "Gymslay",
    description: "Kroppsviktsträning för alla nivåer",
    thumbnail: "/images/PullUps.png",
    currentParticipants: 10,
    maxParticipants: 10,
  },
];

const ListCards = () => {
  return (
    <div className="cards-list">
      {mockSessions.map((session) => (
        <EventCard key={session.id} session={session} />
      ))}
    </div>
  );
};

export default ListCards;
