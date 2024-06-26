"use strict";
// Funktion för att logga in användare, exporteras
export async function loginUser() {
    const url = "https://moment-4-1-backend.onrender.com/api/login";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    const loginData = {
        username: username,
        password: password
    };

    try {
        // Visa laddningsikon
        startSpinner();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            // Sparar JWT i localStorage efter inloggning
            localStorage.setItem("JWT", data.response.token);
            // Sparar användarnamnet i localStorage
            localStorage.setItem("username", username); 
            // Redirect användaren till showjobs efter inloggning
            window.location.href = "/showjobs.html";
            // Dölj laddningsikon
            hideSpinner();

        } else {
            // Inloggningen misslyckades, visa felmeddelande
            console.error("Inloggning misslyckades");
            errorMsg.textContent = "Fel användarnamn eller lösenord";
            errorMsg.style.display = "block";
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}

/* Visa laddningsikon medan användaren loggas in */
function startSpinner() {
    const loadingIcon = document.getElementById("loading-icon");
    if (loadingIcon) {
        loadingIcon.style.display = "block";
    }
}
/* Dölj laddningsikon */
function hideSpinner() {
    const loadingIcon = document.getElementById("loading-icon");
    if(loadingIcon) {
        loadingIcon.style.display = "none";
    }
}