import React from "react";
import "../styles/actionBlock.scss"; // Import the CSS file

function ActionBlock({ block, onUpdate }) {
  // Handler to update the value of a specific field in the block
  const handleInputChange = (field, value) => {
    onUpdate({ ...block, [field]: value });
  };

  return (
    <div className="block">
      {block.type === "goto" ? (
        <div className="block-content">
          <span className={`block-type goto-x`}>{block.type} x:</span>
          <input
            type="number"
            value={block.x}
            onChange={(e) => handleInputChange("x", e.target.value)}
            className="block-input"
          />
          <span className={`block-type goto-y`}>y:</span>
          <input
            type="number"
            value={block.y}
            onChange={(e) => handleInputChange("y", e.target.value)}
            className="block-input"
          />
          <span className={`block-type goto-coordinates`}>coordinates</span>
        </div>
      ) : block.type === "repeat" ? (
        <div className="block-content">
          <span className={`block-type repeat`}>Repeat</span>
        </div>
      ) : (
        <div className="block-content">
          <span className={`block-type other`}>
            {block.type} {block.description && `(${block.description})`}
          </span>
          <input
            type="number"
            value={block.value}
            onChange={(e) => handleInputChange("value", e.target.value)}
            className="block-input"
          />
          <span
            className={`block-type ${
              block.type === "move" ? "block-type-steps" : "block-type-degrees"
            }`}
          >
            {block.type === "move" ? "steps" : "degrees"}
          </span>
        </div>
      )}
    </div>
  );
}

export default ActionBlock;
