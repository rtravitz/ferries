import { createContext } from 'react';
import { type ActivePane } from './ActivePaneWrapper';
import Vessel from '../models/Vessel';
import type { Map } from 'leaflet';
import type { Terminal, TerminalVessels } from '../models/Terminal';

interface ActivePaneContextFields {
  activePane: ActivePane
  map: Map | null;
  showOutOfService: boolean;
  showDocks: boolean;
  setActivePane: React.Dispatch<React.SetStateAction<ActivePane>>;
  setVessel: (vessel: Vessel) => () => void;
  setTerminal: (terminal: Terminal, vessels: TerminalVessels) => () => void;
  setInfo: () => void;
  setSettings: () => void;
}

export const ActivePaneContext = createContext<ActivePaneContextFields>({
  activePane: null,
  map: null,
  showOutOfService: false,
  showDocks: false,
  setActivePane: () => {},
  setVessel: () => () => {},
  setTerminal: () => () => {},
  setInfo: () => {},
  setSettings: () => {},
});
