import React, { useState, createContext, useEffect } from "react";
import { auth, firestore } from "./firebase";

export const AuthContext = createContext();

let AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currUser, SetcurrUser] = useState(null);

  useEffect(() => {
    //onAuthStateChange means if user login or logout
    let unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;
        let docRef = firestore.collection("users").doc(uid);
        let document = await docRef.get();
        if (!document.exists) {
          docRef.set({ displayName, email, photoURL, post: [], uid });
        }
        SetcurrUser({ displayName, email, photoURL, uid });
      } else {
        SetcurrUser(user);
      }
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={currUser}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
