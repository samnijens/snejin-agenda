import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const loginButton = document.getElementById("loginButton");


loginButton.addEventListener("click", async () => {


    const email =
        document.getElementById("email").value;


    const password =
        document.getElementById("password").value;



    try {


        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        window.location.href = "agenda.html";


    } catch(error) {


        document.getElementById("error").innerHTML =
        "❌ Onjuiste email of wachtwoord";


    }


});
