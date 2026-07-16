console.log("✅ login.js geladen");


import { auth } from "./firebase.js";


import {
    signInWithEmailAndPassword
}
from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



const button = document.getElementById("loginButton");


if (!button) {

    console.error("❌ Login knop niet gevonden");

}


button.addEventListener("click", async function(){


console.log("🟢 Login knop ingedrukt");


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const error =
document.getElementById("error");



error.innerHTML = "Even geduld...";



try {


const result =
await signInWithEmailAndPassword(
auth,
email,
password
);



console.log(
"✅ Ingelogd:",
result.user.email
);



error.style.color="green";

error.innerHTML =
"✅ Inloggen gelukt!";


setTimeout(()=>{


window.location.href="agenda.html";


},1000);



}


catch(e){


console.error(
"Firebase fout:",
e
);



error.style.color="red";


error.innerHTML =
"❌ " + e.message;



}



});
