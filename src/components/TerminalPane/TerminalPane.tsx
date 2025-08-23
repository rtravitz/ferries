import { TerminalVesselCard } from './TerminalVesselCard';
import type { TerminalVessels } from '../../models/Terminal';

export enum TerminalVesselDirection {
  Incoming,
  Outgoing,
}

interface TerminalPaneProps {
  vessels: TerminalVessels;
}

export function TerminalPane({ vessels }: TerminalPaneProps) {
  const hasVessels = vessels.incoming.length || vessels.outgoing.length;

  const toRender = hasVessels ? (
    <ul>
      {vessels.incoming.map((vessel) => (
        <TerminalVesselCard key={vessel.id} direction={TerminalVesselDirection.Incoming} vessel={vessel} />
      ))}
      {vessels.outgoing.map((vessel) => (
        <TerminalVesselCard key={vessel.id} direction={TerminalVesselDirection.Outgoing} vessel={vessel} />
      ))}
    </ul>
  ) : (
    <h2 className="mb-2 text-center">No vessels are docked, arriving, or departing.</h2>
  );

  return <div className="bg-gray-transparent-200 pb-2 px-4 pt-4">{toRender}</div>;
}
