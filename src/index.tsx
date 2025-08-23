import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { worker } from './mocks/browser';
import { FerryTracker } from './components/FerryTracker';

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <FerryTracker />
    </React.StrictMode>,
  );
});
