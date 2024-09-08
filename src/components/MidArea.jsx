import React, { useContext, useState } from "react";
import "../styles/midArea.scss";
import { ActionContext } from "../context/ActionProvider";
import ActionBlock from "./ActionBlock";

export default function MidArea() {
  const { actions, setActions } = useContext(ActionContext);
  const [selectedAction, setSelectedAction] = useState(1);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const item = JSON.parse(data);

    const updatedActions = actions.map((action) => {
      if (action.actionNo === selectedAction) {
        return { ...action, data: [...action.data, item] };
      }
      return action;
    });

    if (!updatedActions.some((action) => action.actionNo === selectedAction)) {
      updatedActions.push({ actionNo: selectedAction, data: [item] });
    }

    setActions(updatedActions);
    console.log("Action", updatedActions);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (actionNo, itemIndex) => {
    const updatedActions = actions.map((action) => {
      if (action.actionNo === actionNo) {
        return {
          ...action,
          data: action.data.filter((_, i) => i !== itemIndex),
        };
      }
      return action;
    });
    setActions(updatedActions);
  };

  const handleUpdate = (updatedBlock) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.actionNo === selectedAction
          ? {
              ...action,
              data: action.data.map((block) =>
                block.id === updatedBlock.id ? updatedBlock : block
              ),
            }
          : action
      )
    );
  };

  return (
    <div className="mid__main" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="mid__head">Mid Area</div>
      <div className="tab__section">
        <button
          className={selectedAction === 1 ? `act__active` : `act__inactive`}
          onClick={() => setSelectedAction(1)}
        >
          Action 1
        </button>
        <button
          className={selectedAction === 2 ? `act__active` : `act__inactive`}
          onClick={() => setSelectedAction(2)}
        >
          Action 2
        </button>
      </div>

      <ul className="mid__area__list">
        {actions
          .filter((action) => action.actionNo === selectedAction)
          .map((action) =>
            action.data.map((item, itemIndex) => (
              <div className="action__items__out" key={itemIndex}>
                <div className="action__items">
                  <ActionBlock block={item} onUpdate={handleUpdate} />
                </div>
                <button
                  className="close__btn"
                  onClick={() => handleRemove(selectedAction, itemIndex)}
                >
                  X
                </button>
              </div>
            ))
          )}
      </ul>
    </div>
  );
}
