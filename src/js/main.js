"use strict";

// Importerar moduler
import { loginUser } from "./login.js";
import { createUser } from "./register.js";
import { getJobs } from "./showjobs.js";



// Hämtar element och lagrar i variabler
const loginBtn = document.getElementById("loginBtn"); // Logga in-knapp
const loginForm = document.getElementById("loginForm"); // Logga in-formulär
const userBtn = document.getElementById("submitUser"); // Skapa användare-knapp
const userForm = document.getElementById("userForm"); // Skapa användare-formulär

window.onload = init;

function init() { 

// Kontrollera om loginForm finns
if (loginForm) {
    // Hämta input-element från formuläret
    const usernameInput = loginForm.querySelector("#username");
    const passwordInput = loginForm.querySelector("#password");

    // Lägg till en händelselyssnare på logga in-knappen
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Förhindra formulärets standardbeteende (så att sidan inte laddas om)
        
        // Hämta värden från input-fälten
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Anropa loginUser-funktionen med användarnamn och lösenord
        loginUser(username, password); // Skicka med användarnamn och lösenord till funktionen
    });
}
// Kontrollera om formuläret för att skapa användare finns
if (userForm) {
    // Lägg till en händelselyssnare på knappen submit-user
    userBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Förhindra formulärets standardbeteende (så att sidan inte laddas om)
        
        // Anropa funktionen createUser när knappen klickas på
        createUser();
    });
}
 // Kolla om användaren är inloggad och befinner sig på showjobs.html
 checkLoggedIn();
}

// Funktion för att kontrollera inloggning och omdirigera användaren vid behov
function checkLoggedIn() {
    const token = localStorage.getItem("JWT"); // Hämta JWT från localStorage
    const currentPage = window.location.pathname; // Hämta den aktuella sidan

    console.log(currentPage);

    // Kontrollera om användaren är inloggad och befinner sig på showjobs.html
    if (token && currentPage.includes("/showjobs")) {

        console.log("Fetching jobs...");

        // Anropa funktionen för att hämta jobberfarenheter
        getJobs();

    } else if (!token && currentPage.includes("/showjobs")) {
        // Visa ett felmeddelande om användaren inte är inloggad
        alert("Du är inte inloggad. Vänligen logga in för att visa jobberfarenheter.");
        // Omdirigera till startsidan
        window.location.href = "/index.html";
    }
}


