import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { worker } from './mocks/browser';
import { FerryTracker } from './components/FerryTracker';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FerryTracker />
  </React.StrictMode>,
);
