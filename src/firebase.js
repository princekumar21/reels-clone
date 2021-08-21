import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

import { firebaseConfig } from "./config.js"
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const storage = firebase.storage();

let provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
