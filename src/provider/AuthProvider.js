import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported} from "firebase/analytics";
import { getFirestore, collection, query, where, addDoc, getDocs, doc, setDoc} from "firebase/firestore";


const AuthContext = createContext();
const AuthProvider = (props) => {
  const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

