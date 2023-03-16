import React, { createContext, useContext } from "react";
import { database } from "../firebaseConfig";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const value = {};
  console.log(database);
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
