import { initializeApp } from "firebase/app";
import { 
  getAuth 
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyARKx42cvUgW9Qpf33DmBirfMdSERi8Jl8",
  authDomain: "snejin-agenda-7db33.firebaseapp.com",
  projectId: "snejin-agenda-7db33",
  storageBucket: "snejin-agenda-7db33.firebasestorage.app",
  messagingSenderId: "494528590764",
  appId: "1:494528590764:web:c177e87c3842fc9c55c009"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);
