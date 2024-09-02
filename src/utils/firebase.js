
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "foodpanda-9c4f8.firebaseapp.com",
    projectId: "foodpanda-9c4f8",
    storageBucket: "foodpanda-9c4f8.appspot.com",
    messagingSenderId: "501463467137",
    appId: process.env.FIREBASE_ID,
    measurementId: "G-74CVQMJZSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth();


// npm install -g firebase-tools to host into git hub
// firebase login
// firebase init
// firebase deploy
// To host your site with Firebase Hosting, you need the Firebase CLI (a command line tool