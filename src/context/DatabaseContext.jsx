import React, { createContext, useContext } from "react";
import { database } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import { collection } from "firebase/firestore";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const postsRef = collection(database, "Posts");
  const value = {
    database,
    storage,
    postsRef,
  };
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
