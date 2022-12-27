import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7m2lCZw8PZJfNUlxARGcElyJlfnPXhU8",
  authDomain: "matchinggame-a369a.firebaseapp.com",
  databaseURL: "https://matchinggame-a369a-default-rtdb.firebaseio.com",
  projectId: "matchinggame-a369a",
  storageBucket: "matchinggame-a369a.appspot.com",
  messagingSenderId: "256659838260",
  appId: "1:256659838260:web:87e2051997b323741b4161",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

let playerRef;

// Add a player to the database when they join
onAuthStateChanged(auth, (user) => {
  if (user) {
    global.playerId = user.uid;
    playerRef = ref(db, `players/${playerId}`);
    set(playerRef, {
      id: playerId,
    });
  }
});

// Sign in
signInAnonymously(auth).catch((error) => {
  console.log(error.code, error.message);
});

export { db, auth };
