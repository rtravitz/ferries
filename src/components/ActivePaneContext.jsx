import { createContext } from 'react';

export const ActivePaneContext = createContext({
  activePane: null,
  map: null,
  showOutOfService: false,
  showDocks: false,
  setActivePane: () => {},
  setVessel: () => {},
  setTerminal: () => {},
  setInfo: () => {},
  setSettings: () => {},
});
