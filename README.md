# Moment 4.2 - Autentisering och säkerhet

Detta är en webbplats som använder den webbtjänst som skapades i moment 4.1. Webbplatsen ger 
användare möjlighet att skapa ett konto och logga in. Inloggning krävs för att kunna se data som
finns tillgängligt bakom en skyddad route. 

All data för användarkonton och innehåll i den skyddade routen sparas och uppdateras i en 
MongoDB-databas som distribueras via MongoDB Atlas. 

# Länk

Länk till webbplatsen: [https://rono2300-dt207g-moment4-2.netlify.app/](https://rono2300-dt207g-moment4-2.netlify.app/) 

# Arbetsgång

Webbplatsen är byggd med Parcel för en automatiserad utvecklingsmiljö och är publicerad till Netlify. 
Sidan har skapats med HTML, CSS(SCSS) och JavaScript som är strukturerad i separata kataloger.
API:et som används är byggt med Node.js och Express och är publicerat till Render. Kommunikation med 
webbtjänsten sker med Fetch API för att skapa konton och logga in. 

## Skapad av:
Ronja Norlén, rono2300, 2024.
