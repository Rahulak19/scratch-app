import React, { useState } from "react";
import "../styles/sidebar.scss";
import ActionBlock from "./ActionBlock";

export default function Sidebar() {
  const [block, setBlock] = useState([
    { id: 1, type: "move", value: 10 },
    { id: 2, type: "turn", value: 15, description: "left" },
    { id: 3, type: "turn", value: 25, description: "right" },
    { id: 4, type: "goto", x: 50, y: 100 },
    { id: 5, type: "repeat" },
  ]);

  const handleUpdate = (updatedBlock) => {
    setBlock((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      )
    );
  };

  const handleOnDrag = (e, data) => {
    const item = JSON.stringify(data);
    e.dataTransfer.setData(`text/plain`, item);
  };
  return (
    <>
      <div className="side__main">
        <div className="side__head">Motion</div>
        <div className="action__block">
          {block.map((action, index) => (
            <div
              draggable
              onDragStart={(e) => handleOnDrag(e, action)}
              className="action__items"
              key={index}
            >
              <ActionBlock block={action} onUpdate={handleUpdate} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
