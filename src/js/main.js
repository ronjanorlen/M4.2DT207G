"use strict";

// Importerar moduler
import { loginUser } from "./login.js";
import { createUser } from "./register.js";

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
        e.preventDefault(); // Förhindra formulärets standardbeteende 
        
        // Hämta värden från input-fälten
        const username = usernameInput.value;
        const password = passwordInput.value;

        loginUser(username, password); // Skicka med användarnamn och lösenord till ny funktion
    });
}

// Kontrollera om formuläret för att skapa användare finns
if (userForm) {
    // Lägg till en händelselyssnare på knappen submit-user
    userBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Förhindra formulärets standardbeteende
        
        // Anropa funktionen createUser när knappen klickas på
        createUser();
    });
}
 // Anropa funktion för att kontrollera om besökare är inloggad
     checkLoggedIn();
}

// Funktion för att kontrollera inloggning och omdirigera besökaren vid behov
export function checkLoggedIn() {
    const token = localStorage.getItem("JWT"); // Hämta JWT från localStorage
    const currentPage = window.location.pathname; // Hämta den aktuella sidan

    // Kontrollera om besökare är inloggad och befinner sig på showjobs.html
    if (token && currentPage.includes("/showjobs")) {
        // Visa skyddat innehåll
       document.getElementById("protected-route").style.display = "block";

    } else if (!token && currentPage.includes("/showjobs")) {
        // Visa ett felmeddelande om användaren inte är inloggad
        alert("Du är inte inloggad. Vänligen logga in för att visa arbetserfarenheter.");
        // Omdirigera till startsidan
        window.location.href = "/index.html";
    }
}


