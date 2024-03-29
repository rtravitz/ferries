import { STATUS_GOOD, STATUS_DELAYED, STATUS_OUT_OF_SERVICE } from '../constants';

const CALCULATING = 'Calculating';

export default class Vessel {
  constructor(v) {
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
      return this.isDelayed() ? STATUS_DELAYED : STATUS_GOOD;
    }

    return STATUS_OUT_OF_SERVICE;
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
