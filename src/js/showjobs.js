"use strict";
// Funktion för att hämta data från api och visa jobberfarenheter på sidan, exporteras
export async function getJobs() {

    console.log("Hämtar jobberfarenheter...");

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
            console.error("Hämtningen av jobberfarenheter misslyckades.");
            alert("Kunde inte hämta jobberfarenheter. Vänligen försök igen senare.");
        }
    } catch (error) {
        console.error("Något gick fel vid anropet till API:et: ", error);
        alert("Något gick fel vid hämtning av jobberfarenheter. Vänligen försök igen senare.");
    }
}
// Funktion för att visa jobberfarenheter på sidan
function displayExperiences(data) {

    console.log("Visar jobberfarenheter på sidan...");
    console.table(data);

 /*   setTimeout(() => {
        const workContainer = document.getElementById("work-container");
        console.log("workContainer exists:", workContainer);

        // Formatera datum
        function formDate(timestamp) {
            return timestamp.split('T')[0];
        }
        // Kontroll att container finns
        if (workContainer) {
            workContainer.innerHTML = "";

            console.log(workContainer);
            console.log("Innan loopen, antal erfarenheter:", job.length === 0);

            // Loopa igenom och skapa element för varje jobb
            data.forEach(experience => {

                console.log("Hanterar erfarenhet:", experience);

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
        } else {
            console.error("workContainer not found!");
        }
    }, 100); // Fördröjningen är inställd på 100 millisekunder
    */
}