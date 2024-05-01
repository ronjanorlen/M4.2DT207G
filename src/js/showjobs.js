"use strict";

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

// Funktion för att hämta data från api och visa jobberfarenheter på sidan, exporteras
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
            console.error("Hämtning av arbetserfarenheter misslyckades.");
            alert("Kunde inte hämta jobberfarenheter. Vänligen försök igen senare.");
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
        alert("Något gick fel vid hämtning av arbetserfarenheter. Vänligen försök igen senare.");
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

                // Skapar en article för varje jobberfarenhet
                const articleEl = document.createElement("article");
                // Skapar ett unikt ID för varje article baserat på erfarenhetens ID
                let articleID = `${experience._id}`;
                articleEl.id = articleID;
                // Sätter artikelns innehåll till erfarenhetens data (företagsnamn, titel, plats, datum och beskrivning)
                articleEl.innerHTML = `
                    <div>
                        <h3 class="company-name">${experience.companyname}</h3>
                        <p><strong>Roll:</strong> ${experience.jobtitle}</p>
                        <p><strong>Plats:</strong> ${experience.location}</p>
                        <p><strong>Tidsperiod:</strong> ${formDate(experience.startdate)} - ${formDate(experience.enddate)}</p>
                        <h4>Beskrivning</h4>
                        <p>${experience.description}</p>
                    </div>
                `;
                // Lägger till artikeln i container för att skriva ut till DOM
                workContainer.appendChild(articleEl);
            });
        
        }
    
}