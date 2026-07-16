import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const loginButton = document.getElementById("loginButton");


loginButton.addEventListener("click", async function(){


    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    const errorText = document.getElementById("error");


    errorText.innerHTML = "Bezig met inloggen...";


    try {


        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        errorText.style.color = "green";

        errorText.innerHTML =
        "✅ Inloggen gelukt!";


        console.log(
            "Ingelogd:",
            userCredential.user.email
        );


        setTimeout(()=>{

            window.location.href = "agenda.html";

        },1000);



    } catch(error) {


        console.error(error);


        errorText.style.color = "red";


        if(error.code === "auth/invalid-credential"){

            errorText.innerHTML =
            "❌ Onjuist emailadres of wachtwoord";

        }

        else if(error.code === "auth/invalid-email"){

            errorText.innerHTML =
            "❌ Ongeldig emailadres";

        }

        else {

            errorText.innerHTML =
            "❌ Fout: " + error.message;

        }


    }


});
