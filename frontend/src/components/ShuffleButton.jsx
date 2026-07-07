import React from "react";

function ShuffleButton({ onShuffle }) {
  return (
    <button 
      className="shuffle-btn" 
      onClick={onShuffle} 
      style={{ 
        marginLeft: "15px", 
        cursor: "pointer", 
        padding: "6px 12px", 
        backgroundColor: "#1e293b", 
        color: "white", 
        border: "none", 
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "0.9rem"
      }}
    >
      🔀 Discover Random
    </button>
  );
}

export default ShuffleButton;
