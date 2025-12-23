import * as React from 'react';
import { useState } from 'react';
import { ActivePaneContext } from './ActivePaneContext';
import { Map } from './Map/Map';
import VesselPane from './VesselPane';
import InfoPane from './InfoView';
import SettingsPane from './SettingsView';
import { TerminalPane } from './TerminalPane/TerminalPane';
import { useStickyState } from '../hooks';
import { defaultShowDocks, defaultShowOutOfService } from '../settings';
import Vessel from '../models/Vessel';
import type { Terminal, TerminalVessels } from '../models/Terminal';
import { Map as LeafletMap } from 'leaflet';

export enum ActivePaneType {
  Vessel,
  Terminal,
  Settings,
  Info,
}

interface VesselActivePane {
  component: React.ReactElement;
  header: string;
  headerColor: string;
  vesselID: number;
  type: ActivePaneType.Vessel;
}

interface TerminalActivePane {
  component: React.ReactElement;
  header: string;
  headerColor: string;
  terminalId: string;
  dockHeader: boolean;
  type: ActivePaneType.Terminal;
}

interface SettingsActivePane {
  component: React.ReactElement;
  header: string;
  type: ActivePaneType.Settings;
}

interface InfoActivePane {
  component: React.ReactElement;
  header: string;
  type: ActivePaneType.Info;
}

export type ActivePane = VesselActivePane | TerminalActivePane | SettingsActivePane | InfoActivePane | null;

export function ActivePaneWrapper() {
  const [activePane, setActivePane] = useState<ActivePane>(null);
  const [showOutOfService, setShowOutOfService] = useStickyState(defaultShowOutOfService, 'showOutOfService');
  const [showDocks, setShowDocks] = useStickyState(defaultShowDocks, 'showDocks');
  const [map, setMap] = useState<LeafletMap | null>(null);

  const setVessel = (vessel: Vessel) => {
    let headerColor = 'bg-ferry-red';
    if (vessel.isInService()) {
      headerColor = vessel.isDelayed() ? 'bg-ferry-yellow' : 'bg-ferry-green';
    }

    return () => {
      if (activePane && activePane.type === ActivePaneType.Vessel && activePane.vesselID === vessel.id) {
        setActivePane(null);
      } else {
        setActivePane({
          component: <VesselPane vessel={vessel} />,
          header: vessel.name,
          headerColor,
          vesselID: vessel.id,
          type: ActivePaneType.Vessel,
        });
      }
    };
  };

  const setTerminal = (terminal: Terminal, vessels: Array<Vessel>) => {
    const relevantVessels = vessels.reduce(
      (sorted: TerminalVessels, v: Vessel) => {
        if (showOutOfService || v.isInService()) {
          if (v.lastDock === terminal.name) {
            sorted.outgoing.push(v);
          }
          if (v.nextDock === terminal.name) {
            sorted.incoming.push(v);
          }
        }
        return sorted;
      },
      { incoming: [], outgoing: [] },
    );

    return () => {
      if (activePane && activePane.type === ActivePaneType.Terminal && activePane.terminalId === terminal.name) {
        setActivePane(null);
      } else {
        setActivePane({
          component: <TerminalPane vessels={relevantVessels} />,
          header: terminal.name,
          headerColor: 'bg-sky-700',
          terminalId: terminal.name,
          dockHeader: true,
          type: ActivePaneType.Terminal,
        });
      }
    };
  };

  const setInfo = () => {
    const INFO = 'Info';

    if (activePane && activePane.type === ActivePaneType.Info) {
      setActivePane(null);
    } else {
      setActivePane({
        component: <InfoPane />,
        header: INFO,
        type: ActivePaneType.Info,
      });
    }
  };

  const setSettings = () => {
    const SETTINGS = 'Settings';

    if (activePane && activePane.type === ActivePaneType.Settings) {
      setActivePane(null);
    } else {
      setActivePane({
        component: <SettingsPane
          showOutOfService={showOutOfService}
          setShowOutOfService={setShowOutOfService}
          showDocks={showDocks}
          setShowDocks={setShowDocks} />,
        header: SETTINGS,
        type: ActivePaneType.Settings,
      });
    }
  };

  return (
    <ActivePaneContext.Provider
      value={{
        activePane,
        setActivePane,
        setVessel,
        setTerminal,
        setInfo,
        setSettings,
        showOutOfService,
        showDocks,
        map,
      }} >
      <Map setMap={setMap} map={map} />
    </ActivePaneContext.Provider>
  );
}
