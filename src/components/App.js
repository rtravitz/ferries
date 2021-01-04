import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import axios from 'axios'
import Vessel from '../models/Vessel'
import { makeIcon } from '../mapIcon'
import BottomPane from './BottomPane'
import FixedControls from './FixedControls'
import VesselPane from './VesselView'
import InfoPane from './InfoView'

const BACKEND = process.env.REACT_APP_BACKEND

export default function App() {
  const [vessels, setVessels] = useState([])
  const [activeVesselID, setActiveVesselID] = useState(null)
  const [activePane, setActivePane] = useState(null)

  const refreshVessels = () => {
    axios.get(BACKEND)
      .then(res => {
        const vessels = res.data.vessellist.map(v => new Vessel(v))
        setVessels(vessels)
      })
      .catch(err => { console.log(err) })
  }

  useEffect(refreshVessels, [])

  const setVessel = (vessel) => {
    let headerColor = 'bg-ferry-red'
    if (vessel.isInService()) {
      headerColor = vessel.isDelayed() ? 'bg-ferry-yellow' : 'bg-ferry-green'
    }

    return () => {
      setActivePane({
        component: <VesselPane vessel={vessel} />,
        header: vessel.name,
        headerColor,
      })
      setActiveVesselID(vessel.id)
    }
  }

  const setInfo = () => {
    const INFO = 'Info'

    if (activePane && activePane.header === INFO) {
      setActivePane(null)
    } else {
      setActiveVesselID(null)
      setActivePane({
        component: <InfoPane />,
        header: INFO
      })
    }
  }

  return (
    <section>
      <MapContainer
        zoomControl={false}
        center={[47.965330, -122.659685]}
        zoom={9}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          vessels.map(v => {
            const isSelected = activeVesselID === v.id
            const icon = makeIcon(v.status(), isSelected)

            return (
              <Marker
                key={v.id}
                icon={icon}
                position={[v.lat, v.lon]}
                zIndexOffset={isSelected ? 1000 : 1}
                eventHandlers={{ click: setVessel(v) }} />
            )
          })
        }
      </MapContainer>
      <FixedControls 
        refreshVessels={refreshVessels} 
        setInfo={setInfo} />
      {
        activePane &&
        <BottomPane
          toRender={activePane.component}
          header={activePane.header}
          headerColor={activePane.headerColor} />
      }
    </section>
  )
}
