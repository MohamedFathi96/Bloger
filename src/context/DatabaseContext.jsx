import React, { createContext, useContext, useState } from "react";
import { database } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import { collection } from "firebase/firestore";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const postsRef = collection(database, "Posts");
  const [posts, setposts] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  const value = {
    database,
    storage,
    postsRef,
    setposts,
    posts,
    searchValue,
    setsearchValue,
  };
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
