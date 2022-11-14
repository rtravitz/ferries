# Ferry Tracker

![Ferry Icon](public/ferry-icon.svg)

![Netlify Status](https://api.netlify.com/api/v1/badges/77e31894-20cb-4ae9-b5a7-0310355b7fca/deploy-status)

This app checks the location of Washington State Ferries using the same API that powers [VesselWatch](https://www.wsdot.com/ferries/vesselwatch/) and presents it in a mobile-friendly format. I made it because ferries are the best, but I have a hard time reading the existing realtime map while using my phone in line at the dock.

Check it out for yourself at https://ferries.ryantravitz.com

### Running locally

Clone the app, make sure to have the most recent LTS version of Node available, and `npm install`. 

Two other things to know:

- The app tries to fetch ferries from `localhost:5273/ferries` when `NODE_ENV=development`. This is specified in `.env.development`. The responses are mocked locally with a service worker provided by `msw`. It should mean that there is usable data for development out of the box after initial clone and install. The relevant configuration is mostly in `src/mocks`.
- In production the client sends requests to a lambda instead of hitting the API directly (yay CORS). The code for that lambda lives in `src/api/vessels.js`.

### Tests

The tests all live under `src/__tests__`. They primarily use [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) with some support from [msw](https://www.npmjs.com/package/msw) for mocking network requests. Vitest handles all of the hard work of setting up the test environment just right with jsdom, et al. You can run everything with `npm test`. 

### Deployment

Each new PR will generate a staging link to review. Once a PR is merged, the changes are built and deployed to production automatically. CI and hosting are both on Netlify.

### Libraries and Services

#### App
- [React](https://reactjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)
- [react-spring](https://react-spring.dev/)
- [OpenStreetMap](https://www.openstreetmap.org/)

#### Development
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [msw](https://www.npmjs.com/package/msw)

