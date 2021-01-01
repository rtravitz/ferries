import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import axios from 'axios'
import { delayedIcon, stoppedIcon, goodIcon } from './Marker'
import VesselPane from './vesselPane/VesselPane'
import Vessel from './Vessel'
import FixedControls from './FixedControls'

function App() {
  const [vessels, setVessels] = useState([])
  const [selectedVessel, setSelectedVessel] = useState(null)
  useEffect(() => {
    axios.get('http://localhost:5000/ferries')
      .then(res => {
        const vessels = res.data.vessellist.map(v => new Vessel(v))
        setVessels(vessels)
      })
      .catch(err => { console.log(err) })
  }, [])

  const setVessel = (vessel) => {
    return () => {
      setSelectedVessel(vessel)
    }
  }

  return (
    <section>
      <MapContainer
        zoomControl={false}
        center={[47.6038321, -122.3300624]}
        zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          vessels.map(v => {
            let icon = stoppedIcon
            if (v.isInService()) {
              icon = v.isDelayed() ? delayedIcon : goodIcon
            }
            return (
              <Marker
                key={v.id}
                icon={icon}
                position={[v.lat, v.lon]}
                eventHandlers={{ click: setVessel(v) }} />
            )
          })
        }
      </MapContainer>
      <FixedControls />
      { selectedVessel && <VesselPane vessel={selectedVessel} />}
    </section>
  );
}

export default App;
