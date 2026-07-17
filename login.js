import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.style.color = "#00796B";
    message.textContent = "⏳ Bezig met inloggen...";

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Ingelogd:", userCredential.user.email);

        message.style.color = "#00A651";
        message.textContent = "✅ Inloggen gelukt!";

        setTimeout(() => {
            window.location.href = "agenda.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        message.style.color = "#D32F2F";

        switch (error.code) {

            case "auth/invalid-credential":
                message.textContent = "❌ Onjuist e-mailadres of wachtwoord.";
                break;

            case "auth/user-not-found":
                message.textContent = "❌ Gebruiker bestaat niet.";
                break;

            case "auth/wrong-password":
                message.textContent = "❌ Onjuist wachtwoord.";
                break;

            case "auth/invalid-email":
                message.textContent = "❌ Ongeldig e-mailadres.";
                break;

            case "auth/too-many-requests":
                message.textContent = "❌ Te veel pogingen. Probeer het later opnieuw.";
                break;

            default:
                message.textContent = "❌ " + error.message;

        }

    }

});
