# Ferry Tracker

![Ferry Icon](public/ferry-icon.svg)

![Netlify Status](https://api.netlify.com/api/v1/badges/77e31894-20cb-4ae9-b5a7-0310355b7fca/deploy-status)

This app checks the location of Washington State Ferries using the same API that powers [VesselWatch](https://www.wsdot.com/ferries/vesselwatch/) and presents it in a mobile-friendly format. I made it because ferries are the best, but I have a hard time reading the existing realtime map while using my phone in line at the dock.

Check it out for yourself at https://ferries.ryantravitz.com

### Running locally

Clone the app, make sure to have the most recent LTS version of Node available (14 at the moment), and `npm install`. Instead of the standard `react-scripts`, `craco` is used to allow overriding PostCSS configuration for Tailwind.

Two other things to know:

- The app tries to fetch ferries from `localhost:5000/ferries` when `NODE_ENV=development`. This is specified in `.env.development`. I have been running a teeny server that serves up the same API response forever when developing locally. At some point, I'll roll that tooling into this repo.
- In production the client sends requests to a lambda instead of hitting the API directly. The code for that lambda lives in `src/api/vessels.js`.

### Deployment

Each new PR will generate a staging link to review. Once a PR is merged, the changes are built and deployed to production automatically. Both the client bundle and lambdas in the `src/api` directory are built and hosted on Netlify.

### Libraries and Services

- [React](https://reactjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
