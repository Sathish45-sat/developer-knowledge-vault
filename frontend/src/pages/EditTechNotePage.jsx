import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import techNoteService from "../services/techNoteService";

function EditTechNotePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title || "");
  const [description, setDescription] = useState(state.description || "");
  const [codeSnippet, setCodeSnippet] = useState(state.codeSnippet || "");
  const [tags, setTags] = useState(state.tags ? state.tags.join(", ") : "");
  const [difficulty, setDifficulty] = useState(state.difficulty || "Easy");
  const [imageUrl, setImageUrl] = useState(state.imageUrl || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(state.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);
    
    try {
      let finalImageUrl = imageUrl; // Default to the text-input URL
      
      if (imageFile) {
        finalImageUrl = await techNoteService.uploadImage(imageFile);
      }

      const updatedTechNote = {
        ...state,
        title,
        description,
        codeSnippet,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [],
        difficulty,
        imageUrl: finalImageUrl // Ensure updated property
      };

      const techNoteId = state._id || state.id;
      await techNoteService.updateTechNote(techNoteId, updatedTechNote);
      alert("Updated!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to update techNote. Ensure you are the owner and it exists.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setImageUrl(""); // Clear URL input when a file is explicitly picked
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreview(e.target.value);
    setImageFile(null); // Drop the picked file if a URL is manually typed
  };

  return (
    <div className="form-container">
      <h2>Edit Tech Note</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Note Title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
        <textarea 
          placeholder="Description or explanation"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ minHeight: "80px" }}
        />
        
        <textarea
          className="code-input"
          placeholder="Paste code snippet here..."
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated, e.g., react, javascript, ui)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        
        <div style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Paste Image URL..."
            value={imageUrl}
            onChange={handleUrlChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#666" }}>OR upload a file:</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && <img src={preview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }} />}
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Saving..." : "Update Tech Note"}
        </button>
      </form>
    </div>
  );
}

export default EditTechNotePage;