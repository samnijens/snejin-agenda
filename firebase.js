// Firebase configuratie
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Firebase instellingen
const firebaseConfig = {

    apiKey: "AIzaSyANmArkrkCQRKwyEDrIgFokX0NLBZ5O3qw",

    authDomain: "snejin-agenda-b63b3.firebaseapp.com",

    projectId: "snejin-agenda-b63b3",

    storageBucket: "snejin-agenda-b63b3.firebasestorage.app",

    messagingSenderId: "1065483226806",

    appId: "1:1065483226806:web:d43dd736dfab44c39ee017"

};

// Firebase starten
const app = initializeApp(firebaseConfig);

// Services exporteren
export const auth = getAuth(app);

export const db = getFirestore(app);
