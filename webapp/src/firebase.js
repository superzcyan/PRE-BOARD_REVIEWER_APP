// Imports from firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

//WebApp Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3w5v-FJz1MFQjAkqvLeffDr3cmW3_zpw",
  authDomain: "mapeh-reviewer.firebaseapp.com",
  databaseURL:
    "https://mapeh-reviewer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mapeh-reviewer",
  storageBucket: "mapeh-reviewer.appspot.com",
  messagingSenderId: "98780356612",
  appId: "1:98780356612:web:f08de70a2a8d9c76b2d551",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const getDB = getDatabase(app);
export const getStrge = getStorage(app);
