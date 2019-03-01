## Klikkaa ja voita! -moninpelisovellus

## Backend: ExpressJS, Frontend: React, Tietokanta: Mysql

Sovelluksen tietokantataulujen luontilauseet löytyvät extras-kansiosta.

Tietokannan tiedot syötetään lib-kansiosta löytyvään pool.js tiedostoon.

Sovellus käynnistetään kahteen eri localhost-palvelumeen.

Sovelluksen kansiossa express-backend käynnistys :
npm start

client kansiossa react-frontend käynnistys:
npm start

Peli käynnistyy http://localhost:3000

Pelissä valitaan ensin nimimerkki, jonka jälkeen pelaaja alkaa klikkailemaan nappulaa. Jos hän voittaa, nimimerkki lisätään edellisten voittajien listaan. Edellisten voittajien lista päivittyy automaattisesti 10 sekunnin välein.
