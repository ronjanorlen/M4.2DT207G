"use strict";

// Funktion för att skapa ny användare, exporteras
export async function createUser() {
    const url = "https://moment-4-1-backend.onrender.com/api/register";
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const successMessage = document.getElementById("successMessage");

    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            // Användaren skapades, visa ett meddelande 
            successMessage.innerHTML = "Användare skapad! <br> Gå till <a href='index.html'>startsidan</a> för att logga in";
            successMessage.classList.add("show");

        } else {
            // Något gick fel vid skapandet av användaren, visa felmeddelande
            console.error("Något gick fel vid skapandet av användare");
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}