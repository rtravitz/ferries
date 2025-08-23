const CALCULATING = 'Calculating';

export enum VesselStatus {
  Good,
  Delayed,
  OutOfService,
}

export interface ApiVessel {
  vesselID: number;
  name: string;
  inservice: string;
  lastdock: string;
  leftdock: string;
  leftdockAMPM: string;
  aterm: string;
  eta: string;
  etaAMPM: string;
  etaBasis: string;
  departDelayed: string;
  nextdep: string;
  nextdepAMPM: string;
  lat: number;
  lon: number;
  speed: number;
  headtxt: string;
}

export default class Vessel {
  public readonly id: number;
  public readonly name: string;
  public readonly lastDock: string;
  public readonly etaReason: string;
  public readonly lat: number;
  public readonly lon: number;
  public readonly speed: number;
  public readonly nextDock: string;
  public readonly headingText: string;
  public readonly leftDock: string;
  public readonly eta: string;
  public readonly nextDeparture: string;
  private inService: string;
  private departDelayed: string;

  constructor(v: ApiVessel) {
    this.id = v.vesselID;
    this.name = v.name;
    this.inService = v.inservice;
    this.lastDock = v.lastdock ? v.lastdock.trim() : '';
    this.leftDock = `${v.leftdock} ${v.leftdockAMPM}`.trim();
    this.nextDock = v.aterm;
    this.eta = `${v.eta} ${v.etaAMPM}`.trim();
    this.etaReason = v.etaBasis;
    this.departDelayed = v.departDelayed;
    this.nextDeparture = `${v.nextdep} ${v.nextdepAMPM}`;
    this.lat = v.lat;
    this.lon = v.lon;
    this.speed = v.speed;
    this.headingText = v.headtxt;
  }

  isInService() {
    return this.inService === 'True';
  }

  isDelayed() {
    return this.departDelayed === 'Y';
  }

  isStopped() {
    return this.headingText === 'Stopped';
  }

  hasNextDeparture() {
    return this.nextDeparture.trim() !== '';
  }

  status() {
    if (this.isInService()) {
      return this.isDelayed() ? VesselStatus.Delayed : VesselStatus.Good;
    }

    return VesselStatus.OutOfService;
  }

  hasEta() {
    return this.eta.length && this.eta !== CALCULATING;
  }

  hasDeparted() {
    return this.leftDock.length > 0;
  }

  hasNextDock() {
    return this.nextDock.length > 0;
  }
}
