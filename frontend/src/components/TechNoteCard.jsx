import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function TechNoteCard({ techNote, onRevisit, onEdit, onDelete, onTagClick }) {
  const { user } = useContext(AuthContext);
  const [isViewing, setIsViewing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safely check what the ID field is on both backend domains.
  const currentUserId = user ? (user.id || user._id) : null;
  const isOwner = techNote.userId && currentUserId && (String(techNote.userId) === String(currentUserId));

  const handleOpenModal = async () => {
    setShowModal(true);
    if (!isViewing && onRevisit) {
      setIsViewing(true);
      try {
        await onRevisit(techNote._id || techNote.id);
      } catch (err) {
        console.error("Error revisiting note:", err);
      } finally {
        setIsViewing(false);
      }
    }
  };

  const handleCopyCode = () => {
    if (!techNote.codeSnippet) return;
    navigator.clipboard.writeText(techNote.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="card" onClick={handleOpenModal}>
        {techNote.imageUrl && <img src={techNote.imageUrl} alt={techNote.title} />}

        <div className="card-content">
          <div>
            <div className="card-header">
              <h3 className="title-clamp" title={techNote.title}>{techNote.title}</h3>
              {techNote.difficulty && (
                <span className={`difficulty-badge diff-${techNote.difficulty.toLowerCase()}`}>
                  {techNote.difficulty}
                </span>
              )}
            </div>

            {techNote.description && (
              <p className="description line-clamp">{techNote.description}</p>
            )}
            
            {techNote.codeSnippet && (
              <div className="code-wrapper code-preview-wrapper">
                <div className="code-header">
                  <span>Code Snippet</span>
                  <button className="code-copy-btn" onClick={(e) => { e.stopPropagation(); handleCopyCode(); }}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <pre className="code-block code-block-preview">
                  <code>{techNote.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          <div className="card-footer">
            {techNote.tags && techNote.tags.length > 0 && (
              <div className="tags-container">
                {techNote.tags.slice(0, 3).map((tag, i) => (
                  <span 
                    key={i} 
                    className="tag-badge"
                    onClick={(e) => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
                    title="Click to filter by this tag"
                  >
                    #{tag}
                  </span>
                ))}
                {techNote.tags.length > 3 && (
                  <span className="tag-badge-more">+{techNote.tags.length - 3}</span>
                )}
              </div>
            )}

            <div className="stats">
              <span>🚀 Views: <strong>{techNote.accessCount || 0}</strong></span>
            </div>

            <button 
              className="btn-revisit" 
              onClick={handleOpenModal}
            >
              📖 View Note
            </button>

            {isOwner && (
              <div className="card-actions">
                <button className="btn-edit" onClick={(e) => { e.stopPropagation(); onEdit(techNote); }}>
                  ✏️ Edit
                </button>
                <button className="btn-delete" onClick={(e) => { e.stopPropagation(); onDelete(techNote); }}>
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL NOTE MODAL OVERLAY */}
      {showModal && (
        <div className="note-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="note-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h2>{techNote.title}</h2>
                {techNote.difficulty && (
                  <span className={`difficulty-badge diff-${techNote.difficulty.toLowerCase()}`}>
                    {techNote.difficulty}
                  </span>
                )}
              </div>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {techNote.imageUrl && (
                <img src={techNote.imageUrl} alt={techNote.title} className="modal-image" />
              )}

              {techNote.description && (
                <div className="modal-section">
                  <h4>Description</h4>
                  <p className="modal-description">{techNote.description}</p>
                </div>
              )}

              {techNote.codeSnippet && (
                <div className="modal-section">
                  <div className="code-wrapper">
                    <div className="code-header">
                      <span>Code Snippet</span>
                      <button className="code-copy-btn" onClick={handleCopyCode}>
                        {copied ? "✓ Copied" : "Copy Code"}
                      </button>
                    </div>
                    <pre className="code-block modal-code-block">
                      <code>{techNote.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}

              {techNote.tags && techNote.tags.length > 0 && (
                <div className="modal-section">
                  <h4>Tags</h4>
                  <div className="tags-container">
                    {techNote.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="tag-badge"
                        onClick={() => { setShowModal(false); onTagClick && onTagClick(tag); }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-footer">
                <div className="stats">
                  <span>🚀 Views: <strong>{techNote.accessCount || 0}</strong></span>
                  {!isOwner && <span style={{ marginLeft: "12px", fontStyle: "italic", color: "#94a3b8" }}>🌐 Shared by community</span>}
                </div>

                {isOwner && (
                  <div className="card-actions" style={{ marginTop: "12px" }}>
                    <button className="btn-edit" onClick={() => { setShowModal(false); onEdit(techNote); }}>
                      ✏️ Edit Note
                    </button>
                    <button className="btn-delete" onClick={() => { setShowModal(false); onDelete(techNote); }}>
                      🗑️ Delete Note
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TechNoteCard;
