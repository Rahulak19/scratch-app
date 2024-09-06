import React, { createContext, useState } from "react";

export const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [actions, setActions] = useState([]);

  return (
    <ActionContext.Provider value={{ actions, setActions }}>
      {children}
    </ActionContext.Provider>
  );
};
