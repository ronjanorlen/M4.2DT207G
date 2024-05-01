"use strict";

// Funktion för att skapa ny användare, exporteras
export async function createUser() {
    const url = "https://moment-4-1-backend.onrender.com/api/register";
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

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
            console.log("Användaren skapades framgångsrikt.");
        } else {
            // Något gick fel vid skapandet av användaren, visa felmeddelande
            console.error("Något gick fel vid skapandet av användaren.");
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}