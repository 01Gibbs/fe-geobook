import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };