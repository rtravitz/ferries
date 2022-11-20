import React from 'react';

export default function InfoPane() {
  return (
    <div className="bg-gray-transparent-200 text-lg p-4 pb-8">
      <p>
        Ferry Tracker uses the API that backs
        <a className="text-green-700 underline" href="https://www.wsdot.com/ferries/vesselwatch/">
          {' '}
          VesselWatch
        </a>
        . I made it because I have a hard time reading the realtime map while using my phone in line at the dock.
      </p>
      <p className="mt-4">
        To be kind to the WSDOT servers, this app only updates vessel information on first load or when you explicitly
        tap the refresh button in the upper-right corner.
      </p>
      <p className="mt-4">
        The source code is{' '}
        <a className="text-green-700 underline" href="https://github.com/rtravitz/ferries">
          available on Github
        </a>
        .
      </p>
    </div>
  );
}
