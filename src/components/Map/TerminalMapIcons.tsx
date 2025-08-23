import { useContext } from 'react';
import { ActivePaneContext } from '../ActivePaneContext';
import { Marker } from 'react-leaflet';
import { makeTerminalIcon } from '../../mapIcon';
import type { Terminal, TerminalVessels } from '../../models/Terminal';
import type Vessel from '../../models/Vessel';
import { ActivePaneType } from '../ActivePaneWrapper';

interface TerminalMapIconsProps {
  terminals: Array<Terminal>;
  vessels: Array<Vessel>;
}

export function TerminalMapIcons({ terminals, vessels }: TerminalMapIconsProps) {
  const { activePane, setTerminal, showOutOfService, showDocks } = useContext(ActivePaneContext);
  if (!showDocks) {
    return null;
  }

  return (
    <>
      {terminals.map((t) => {
        const relevantVessels = vessels.reduce(
          (sorted: TerminalVessels, v: Vessel) => {
            if (showOutOfService || v.isInService()) {
              if (v.lastDock === t.name) {
                sorted.outgoing.push(v);
              }
              if (v.nextDock === t.name) {
                sorted.incoming.push(v);
              }
            }
            return sorted;
          },
          { incoming: [], outgoing: [] },
        );

        const isSelected = activePane !== null && activePane.type === ActivePaneType.Terminal && activePane.terminalId === t.name;

        return (
          <Marker
            alt="terminal"
            icon={makeTerminalIcon(isSelected)}
            key={t.name}
            position={[t.lat, t.lon]}
            eventHandlers={{ mousedown: setTerminal(t, relevantVessels) }}
          />
        );
      })}
    </>
  );
}
