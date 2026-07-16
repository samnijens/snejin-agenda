import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

/* ===========================
   LOGIN
=========================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const errorBox = document.getElementById("errorBox");

        errorBox.textContent = "";

        try {

            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = "home.html";

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/invalid-credential":
                case "auth/wrong-password":
                case "auth/user-not-found":
                    errorBox.textContent = "Onjuist e-mailadres of wachtwoord.";
                    break;

                case "auth/invalid-email":
                    errorBox.textContent = "Ongeldig e-mailadres.";
                    break;

                case "auth/too-many-requests":
                    errorBox.textContent = "Te veel pogingen. Probeer later opnieuw.";
                    break;

                default:
                    errorBox.textContent = "Inloggen mislukt.";
                    break;
            }

        }

    });

}

/* ===========================
   LOGIN CONTROLE
=========================== */

const isHomePage =
    window.location.pathname.endsWith("home.html");

if (isHomePage) {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.replace("index.html");

            return;

        }

        const emailElement = document.getElementById("userEmail");

        if (emailElement) {

            emailElement.textContent = user.email;

        }

    });

}

/* ===========================
   AUTO DOORSTUREN
=========================== */

const isLoginPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/");

if (isLoginPage) {

    onAuthStateChanged(auth, (user) => {

        if (user) {

            window.location.replace("home.html");

        }

    });

}

/* ===========================
   UITLOGGEN
=========================== */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        await signOut(auth);

        window.location.replace("index.html");

    });

}
