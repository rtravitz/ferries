import L from 'leaflet'
import delayed from './assets/ferry-token-delayed.svg'
import outOfService from './assets/ferry-token-out-of-service.svg'
import good from './assets/ferry-token-good.svg'

const HEIGHT = 30
const WIDTH = 90

export const delayedIcon = new L.Icon({
  iconUrl: delayed,
  iconRetinaUrl: delayed,
  iconSize: new L.Point(HEIGHT, WIDTH),
})

export const outOfServiceIcon = new L.Icon({
  iconUrl: outOfService,
  iconRetinaUrl: outOfService,
  iconSize: new L.Point(HEIGHT, WIDTH),
})

export const goodIcon = new L.Icon({
  iconUrl: good,
  iconRetinaUrl: good,
  iconSize: new L.Point(HEIGHT, WIDTH),
})
