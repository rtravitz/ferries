import { useState } from 'react';
import { ActivePaneContext } from './ActivePaneContext';
import { Map } from './Map/Map';
import VesselPane from './VesselPane';
import InfoPane from './InfoView';
import SettingsPane from './SettingsView';
import { TerminalPane } from './TerminalPane/TerminalPane';
import { useStickyState } from '../hooks';

export function ActivePaneWrapper() {
  const [activePane, setActivePane] = useState(null);
  const [showOutOfService, setShowOutOfService] = useStickyState(false, 'showOutOfService');
  const [map, setMap] = useState(null);

  const setVessel = (vessel) => {
    let headerColor = 'bg-ferry-red';
    if (vessel.isInService()) {
      headerColor = vessel.isDelayed() ? 'bg-ferry-yellow' : 'bg-ferry-green';
    }

    return () => {
      if (activePane && activePane.vesselID === vessel.id) {
        setActivePane(null);
      } else {
        setActivePane({
          component: <VesselPane vessel={vessel} />,
          header: vessel.name,
          headerColor,
          vesselID: vessel.id,
        });
      }
    };
  };

  const setTerminal = (terminal, vessels) => {
    return () => {
      if (activePane && activePane.terminalId === terminal.name) {
        setActivePane(null);
      } else {
        setActivePane({
          component: <TerminalPane terminal={terminal} vessels={vessels} />,
          header: terminal.name,
          headerColor: 'bg-sky-700',
          terminalId: terminal.name,
          dockHeader: true,
        });
      }
    };
  };

  const setInfo = () => {
    const INFO = 'Info';

    if (activePane && activePane.header === INFO) {
      setActivePane(null);
    } else {
      setActivePane({
        component: <InfoPane />,
        header: INFO,
      });
    }
  };

  const setSettings = () => {
    const SETTINGS = 'Settings';

    if (activePane && activePane.header === SETTINGS) {
      setActivePane(null);
    } else {
      setActivePane({
        component: <SettingsPane showOutOfService={showOutOfService} setShowOutOfService={setShowOutOfService} />,
        header: SETTINGS,
      });
    }
  };

  return (
    <ActivePaneContext.Provider value={{
      activePane,
      setActivePane,
      setVessel,
      setTerminal,
      setInfo,
      setSettings,
      showOutOfService,
      map,
    }}>
      <Map setMap={setMap} />
    </ActivePaneContext.Provider>
  )

}
