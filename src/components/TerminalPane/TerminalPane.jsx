import React from 'react';
import { TerminalVesselCard } from './TerminalVesselCard';

export const INCOMING = 'Incoming';
export const OUTGOING = 'Outgoing';

export function TerminalPane({ vessels }) {
  const hasVessels = vessels.incoming.length || vessels.outgoing.length;

  const toRender = hasVessels ?  
      <ul>
      { 
        vessels.incoming.map(vessel => <TerminalVesselCard 
          key={vessel.id} 
          direction={INCOMING} 
          vessel={vessel} />)
      }
      { 
        vessels.outgoing.map(vessel => <TerminalVesselCard 
          key={vessel.id} 
          direction={OUTGOING} 
          vessel={vessel} />)
      }
      </ul>
      : <h2 className="mb-2 text-center">No vessels are docked, arriving, or departing.</h2>

  return (
    <div className="bg-gray-transparent-200 pb-2 px-4 pt-4">
      {toRender}
    </div>
  );
}
