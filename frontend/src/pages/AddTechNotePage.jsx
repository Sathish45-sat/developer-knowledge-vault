import React, { useState } from "react";
import techNoteService from "../services/techNoteService";
import { useNavigate } from "react-router-dom";

function AddTechNotePage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [tags, setTags] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    setIsUploading(true);

    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await techNoteService.uploadImage(imageFile);
      }

      const newTechNote = {
        title,
        description,
        codeSnippet,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [],
        difficulty,
        imageUrl: finalImageUrl,
        revisitCount: 0,
        userId
      };

      await techNoteService.createTechNote(newTechNote);
      alert("Tech Note added!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to add tech note");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setImageUrl(""); // Clear text URL if a file is explicitly chosen
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreview(e.target.value);
    setImageFile(null); // Clear file selection if a URL is explicitly typed
  };

  return (
    <div className="form-container">
      <h2>Add Tech Note</h2>
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
          {isUploading ? "Saving..." : "Save Tech Note"}
        </button>

      </form>
    </div>
  );
}

export default AddTechNotePage;