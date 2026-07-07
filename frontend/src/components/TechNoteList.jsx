import React from "react";
import TechNoteCard from "./TechNoteCard";

function TechNoteList({ techNotes, onRevisit, onEdit, onDelete }) {
  if (!techNotes || techNotes.length === 0) {
    return <div className="no-notes" style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No tech notes found.</div>;
  }

  return (
    <div className="wall">
      {techNotes.map((m) => (
        <TechNoteCard
          key={m._id || m.id}
          techNote={m}
          onRevisit={onRevisit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TechNoteList;
