"use strict";

/* Funktion för att skapa ny användare, exporteras */
export async function createUser() {
    const url = "https://moment-4-1-backend.onrender.com/api/register";
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("error-message");

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

        const responseData = await response.json(); // Konvertera svar till JSON

        if (response.ok) {
            // Användaren skapades, visa ett meddelande 
            successMessage.innerHTML = "Användare skapad! <br> Gå till <a href='index.html'>startsidan</a> för att logga in";
            successMessage.classList.add("show");

            // Dölj felmeddelandet när båda fält är ifyllda och konto skapats
            errorMessage.style.display = "none";
        } else {
            // Om något går fel
            if (response.status === 409) {
                // Om användarnamnet är upptaget
                errorMessage.textContent = responseData.error;
            } else if (response.status === 400) {
                // Om användaren inte har fyllt i båda fälten
                errorMessage.textContent = responseData.error;
            } 
            // Felmeddelande visas
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}
