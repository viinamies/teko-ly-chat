# Nova AI — tekoälychat-sivusto

## Käynnistäminen omalla tietokoneella

Tarvitset Node.js-version 18 tai uudemman sekä OpenAI API -avaimen.

1. Pura ZIP-paketti kansioon.
2. Avaa pääkansio terminaalissa.
3. Asenna riippuvuudet komennolla: `npm install`
4. Kopioi `.env.example` nimelle `.env`.
5. Lisää oma API-avaimesi `.env`-tiedoston `OPENAI_API_KEY`-kohtaan.
6. Käynnistä sivusto komennolla: `npm start`
7. Avaa selaimessa `http://localhost:3000`.

## Tärkeää

- API-avain pidetään palvelimella `.env`-tiedostossa. Älä lisää sitä selaimen JavaScriptiin tai julkaise sitä GitHubissa.
- OpenAI API:n käyttö voi olla maksullista ja edellyttää API-tilin laskutuksen käyttöönottoa.
- Ennen julkista julkaisua lisää vähintään käyttörajoitukset, väärinkäytön esto, tietosuojaseloste ja tarvittaessa kirjautuminen.
- Sivusto käyttää OpenAI Responses API:a. Mallin voi vaihtaa `server.js`-tiedoston `model`-asetuksesta.
