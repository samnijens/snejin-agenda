// ==============================
// SNEJIN AGENDA
// Firebase configuratie
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";


// Firebase configuratie

const firebaseConfig = {

    apiKey: "AIzaSyARKx42cvUgW9Qpf33DmBirfMdSERi8Jl8",

    authDomain: "snejin-agenda-7db33.firebaseapp.com",

    projectId: "snejin-agenda-7db33",

    storageBucket: "snejin-agenda-7db33.firebasestorage.app",

    messagingSenderId: "494528590764",

    appId: "1:494528590764:web:2a92bff6dae6515055c009"

};


// Firebase initialiseren

const app = initializeApp(firebaseConfig);


// Services exporteren

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);


// Debugmelding

console.log("✅ Firebase succesvol geïnitialiseerd");
