import React, { createContext, useState } from "react";

export const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [actions, setActions] = useState([
    { actionNo: 1, data: [] },
    { actionNo: 2, data: [] },
  ]);

  const updateActions = (newActions) => {
    setActions(newActions);
  };

  return (
    <ActionContext.Provider value={{ actions, setActions }}>
      {children}
    </ActionContext.Provider>
  );
};
