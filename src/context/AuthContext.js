import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("dark");

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const value = {
    currentUser,
    signUp,
    logIn,
    mode,
    setMode,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
