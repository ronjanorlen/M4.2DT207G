"use strict";

/* Funktion för att skapa ny användare, exporteras */
export async function createUser() {
    const url = "https://moment-4-1-backend.onrender.com/api/register";
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const successMessage = document.getElementById("successMessage");
    const errormessage = document.getElementById("error-message");
    

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

            // Dölj felmeddelandet när båda fält är ifyllda och konto skapats
            errormessage.style.display = "none";

        } else {
            // Något gick fel vid skapandet av användaren, visa felmeddelande
            errormessage.textContent = "Fyll i både användarnamn och lösenord";
            errormessage.style.display = "block";
            
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}
