# book-app

U ovom repozitoriju nalazi se web aplikacija koja služi za pohranu i ocjenjivanje knjiga.
Web aplikaciji možete pristupiti klikom na sljedeći link: https://book-app-97q1.onrender.com/
(NAPOMENA: ovaj link možda neće biti aktivan pa ju možete pokrenuti na vlastitom računalu, opis postupka je niže)

## O aplikaciji

U aplikaciji je moguće:

- registrirati se
- ulogirati se
- dodati novu knjigu
- pregledati sve već dodane knjige i detalje knjiga
- ocijeniti knjigu
- izbrisati knjigu
- komentirati knjigu
- pregledavati komentare o knjigama

Jednostavni frontend dio implementiran je koristeći HTML i CSS, dok je za backend korišten programski jezik Javascript, u Node.js okruženju.
Za spremanje podataka o knjigama i korisnicima korišten je MongoDB Atlas.

U implementaciji se koriste Express.js, Passport.js (za autentikaciju korisnika), mongoose, flash, Chart.js ...

## Pokretanje aplikacije

Aplikaciju možete pregledati u browseru klikom na gore navedeni link ili pokretanjem na vlastitom računalu.
Za pokretanje aplikacije na računalu potrebno je imati instaliran Node.js (može se preuzeti na https://nodejs.org/en/). Tada je postupak sljedeći:

1. Kloniranje repozitorija
2. Pozicioniranje terminalom u direktoriju projekta
3. Izvođenje naredbe "npm install"
4. Kreiranje datoteke s nazivom ".env" u koju se upisuje sljedeće:

SESSION_SECRET = (proizvoljni string)

DB_URI = (link kojim se spaja na MongoDB bazu podataka)

5. Izvođenje naredbe "node app.js"
6. Otvaranje u proizvoljnom web pregledniku adrese "http://localhost:3000/"
