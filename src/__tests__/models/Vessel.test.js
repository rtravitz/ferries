import Vessel from '../../models/Vessel'
import { STATUS_DELAYED, STATUS_GOOD, STATUS_OUT_OF_SERVICE } from '../../constants'

describe('Vessel', () => {
  describe('isInService', () => {
    it('returns true if the vessel has an inservice flag of "True"', () => {
      const v = new Vessel({ inservice: 'True' })

      expect(v.isInService()).toBe(true)
    })

    it('returns false for a value other than "True"', () => {
      const v = new Vessel({ inservice: 'Ahoy' })

      expect(v.isInService()).toBe(false)
    })
  })

  describe('isDelayed', () => {
    it('returns true if it has a departDelayed flag of "Y"', () => {
      const v = new Vessel({ departDelayed: 'Y' })

      expect(v.isDelayed()).toBe(true)
    })

    it('returns false if it has a departDelayed flag other than "Y"', () => {
      const v = new Vessel({ departDelayed: 'paddling along' })

      expect(v.isDelayed()).toBe(false)
    })
  })

  describe('isStopped', () => {
    it('returns true if it has a headtxt of "Stopped"', () => {
      const v = new Vessel({ headtxt: 'Stopped' })

      expect(v.isStopped()).toBe(true)
    })

    it('returns false if it has a headtxt other than "Stopped"', () => {
      const v = new Vessel({ headtxt: 'nah' })

      expect(v.isStopped()).toBe(false)
    })
  })

  describe('hasNextDeparture', () => {
    it('returns true if it has a next departure of any kind', () => {
      const v = new Vessel({ nextdep: '4:30', nextdepAMPM: 'PM' })

      expect(v.hasNextDeparture()).toBe(true)
    })

    it('returns false if it has no next departures', () => {
      const v = new Vessel({ nextdep: '', nextdepAMPM: '' })

      expect(v.isStopped()).toBe(false)
    })

    it('returns false if next departures are just whitespace', () => {
      const v = new Vessel({ nextdep: ' ', nextdepAMPM: ' ' })

      expect(v.isStopped()).toBe(false)
    })
  })

  describe('status', () => {
    it('returns a delayed status is a vessel is in service but delayed', () => {
      const v = new Vessel({ inservice: 'True', departDelayed: 'Y' })

      expect(v.status()).toEqual(STATUS_DELAYED)
    })

    it('returns a good status is a vessel is in service and not delayed', () => {
      const v = new Vessel({ inservice: 'True', departDelayed: 'N' })

      expect(v.status()).toEqual(STATUS_GOOD)
    })

    it('returns a out of service status is a vessel is out of service', () => {
      const v = new Vessel({ inservice: 'False', departDelayed: 'Y' })

      expect(v.status()).toEqual(STATUS_OUT_OF_SERVICE)
    })
  })
})
