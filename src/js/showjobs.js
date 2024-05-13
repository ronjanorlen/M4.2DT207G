"use strict";

// Importera modul
import { checkLoggedIn } from "./main"; 

// Anropa checkLoggedIn
checkLoggedIn();
// Anropa getJobs
getJobs();

// Hämta logga ut-knappen
const logoutBtn = document.getElementById("log-out");

// Lägg till händelsehanterare för logga ut-knapp om den finns
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear(); // Töm localStorage
        window.location.href = "/index.html"; // Omdirigera till startsidan
    });
}

// Funktion för att hämta data från api och visa jobberfarenheter på sidan
async function getJobs() {
    const url = "https://moment-4-1-backend.onrender.com/api/workexperiences"; // Lagra url för API
    const token = localStorage.getItem("JWT"); // Hämtar token från localStorage
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json(); // Invänta svar och konvertera till JSON
        
        if (response.ok) {
            displayExperiences(data); // Ta med data till ny funktion
            
        } else {
            // Inloggningen misslyckades, visa felmeddelande
            alert("Du har inte loggat in eller så har din session gått ut, vänligen logga in på nytt");
            window.location.href = "/index.html"; // Skicka tillbaks till startsidan
            return;
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
    }
}
// Funktion för att visa jobberfarenheter på sidan
function displayExperiences(data) {
        // Formatera datum
        function formDate(timestamp) {
            return timestamp.split('T')[0];
        }

        const workContainer = document.getElementById("work-container");

        // Kontroll att container finns
        if (workContainer) {
            workContainer.innerHTML = "";

            // Loopa igenom och skapa element för varje jobb
            data.forEach(experience => {

                // Skapa en article för varje jobberfarenhet
                const articleEl = document.createElement("article");
                // Skapa id för varje artikel
                let articleID = `${experience._id}`;
                articleEl.id = articleID;
                // Skapa artikelns innehåll 
                articleEl.innerHTML = `
                    <div>
                        <h3 class="company-name">${experience.companyname}</h3>
                        <p><strong>Roll:</strong> ${experience.jobtitle}</p>
                        <p><strong>Plats:</strong> ${experience.location}</p>
                        <p><strong>Tidsperiod:</strong> ${formDate(experience.startdate)} - ${formDate(experience.enddate)}</p>
                        <h4>Beskrivning:</h4>
                        <p>${experience.description}</p>
                    </div>
                `;
                // Lägger till artikeln i container skriver ut till DOM
                workContainer.appendChild(articleEl);
            });
        
        }
    
}