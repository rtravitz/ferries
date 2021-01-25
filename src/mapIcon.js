import L from 'leaflet'
import { STATUS_OUT_OF_SERVICE, STATUS_DELAYED } from './constants'
import delayed from './assets/ferry-token-delayed.svg'
import outOfService from './assets/ferry-token-out-of-service.svg'
import good from './assets/ferry-token-good.svg'

const DEFAULT_H = 30
const DEFAULT_W = 30

export function makeIcon(status, selected) {
  let icon = good
  if (status === STATUS_OUT_OF_SERVICE) {
    icon = outOfService
  } else if (status === STATUS_DELAYED) {
    icon = delayed
  }

  const classes = selected
    ? 'bg-blue-500 rounded-full shadow-md transition-height duration-500'
    : ''
  const width = selected ? 40 : DEFAULT_W
  const height = selected ? 40 : DEFAULT_H

  return new L.Icon({
    className: classes,
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: new L.Point(width, height),
  })
}
