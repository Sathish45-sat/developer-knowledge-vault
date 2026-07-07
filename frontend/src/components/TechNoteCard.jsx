import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TechNoteCard({ techNote, onRevisit, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);

  // Safely check what the ID field is on both backend domains.
  const currentUserId = user ? (user.id || user._id) : null;
  const isOwner = techNote.userId && currentUserId && (String(techNote.userId) === String(currentUserId));

  return (
    <div className="card">
      {techNote.imageUrl && <img src={techNote.imageUrl} alt={techNote.title} />}

      <div className="card-content">
        <div className="card-header">
          <h3>{techNote.title}</h3>
          {techNote.difficulty && (
            <span className={`difficulty-badge diff-${techNote.difficulty.toLowerCase()}`}>
              {techNote.difficulty}
            </span>
          )}
        </div>

        <p className="description">{techNote.description}</p>
        
        {techNote.codeSnippet && (
          <pre className="code-block">
            <code>{techNote.codeSnippet}</code>
          </pre>
        )}

        {techNote.tags && techNote.tags.length > 0 && (
          <div className="tags-container">
            {techNote.tags.map((tag, i) => (
              <span key={i} className="tag-badge">#{tag}</span>
            ))}
          </div>
        )}

        <p className="stats">🚀 Revisited {techNote.accessCount || 0} times</p>

        <button className="btn-revisit" onClick={() => onRevisit(techNote._id || techNote.id)}>
          Revisit Note
        </button>

        {/* ✅ ONLY OWNER CAN SEE EDIT/DELETE */}
        {isOwner && (
            <div className="card-actions" style={{ marginTop: "12px", display: "flex", gap: "0.5rem" }}>
              <button className="btn-edit" onClick={() => onEdit(techNote)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(techNote)}>
                Delete
              </button>
            </div>
        )}

        {!isOwner && (
            <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              Shared by community
            </div>
        )}
      </div>
    </div>
  );
}

export default TechNoteCard;