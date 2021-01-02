import L from 'leaflet'
import delayed from './assets/ferry-token-delayed.svg'
import stopped from './assets/ferry-token-stopped.svg'
import good from './assets/ferry-token-good.svg'

const HEIGHT = 30
const WIDTH = 90

export const delayedIcon = new L.Icon({
  iconUrl: delayed,
  iconRetinaUrl: delayed,
  iconSize: new L.Point(HEIGHT, WIDTH),
})

export const stoppedIcon = new L.Icon({
  iconUrl: stopped,
  iconRetinaUrl: stopped,
  iconSize: new L.Point(HEIGHT, WIDTH),
})

export const goodIcon = new L.Icon({
  iconUrl: good,
  iconRetinaUrl: good,
  iconSize: new L.Point(HEIGHT, WIDTH),
})
