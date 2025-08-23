import type Vessel from "./Vessel";

export interface Terminal {
  name: string;
  lat: number;
  lon: number;
  connections: Array<string>;
}

export interface TerminalVessels {
  incoming: Array<Vessel>;
  outgoing: Array<Vessel>;
}
