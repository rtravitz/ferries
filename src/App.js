import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import axios from 'axios'
import { delayedIcon, stoppedIcon, goodIcon } from './Marker'
import BottomPane from './BottomPane'
import Vessel from './Vessel'
import VesselPane from './VesselPane'
import FixedControls from './FixedControls'
import InfoPane from './InfoPane'

function App() {
  const [vessels, setVessels] = useState([])
  const [activePane, setActivePane] = useState(null)

  const refreshVessels = () => {
    axios.get('http://localhost:5000/ferries')
      .then(res => {
        const vessels = res.data.vessellist.map(v => new Vessel(v))
        setVessels(vessels)
      })
      .catch(err => { console.log(err) })
  }

  useEffect(refreshVessels, [])

  const setVessel = (vessel) => {
    return () => {
      setActivePane({
        component: <VesselPane vessel={vessel} />,
        header: vessel.name
      })
    }
  }

  const setInfo = () => {
    setActivePane({
      component: <InfoPane />,
      header: 'Info'
    })
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
      <FixedControls refreshVessels={refreshVessels} setInfo={setInfo} />
      { 
        activePane && 
        <BottomPane toRender={activePane.component} header={activePane.header} />
      }
    </section>
  );
}

export default App;
