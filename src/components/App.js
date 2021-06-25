import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import axios from 'axios'
import Vessel from '../models/Vessel'
import { makeIcon } from '../mapIcon'
import BottomPane from './BottomPane'
import FixedControls from './FixedControls'
import VesselPane from './VesselView'
import InfoPane from './InfoView'
import SettingsPane from './SettingsView'
import FetchError from './FetchError'
import useStickyState from '../stickyState'

const BACKEND = process.env.REACT_APP_BACKEND

export default function App() {
  const [vessels, setVessels] = useState([])
  const [activePane, setActivePane] = useState(null)
  const [fetchErr, setFetchErr] = useState(false)
  const [showOutOfService, setShowOutOfService] = useStickyState(false, 'showOutOfService')

  const refreshVessels = () => {
    let isSubscribed = true
    axios
      .get(BACKEND)
      .then((res) => {
        const vessels = res.data.vessellist.map((v) => new Vessel(v))
        if (isSubscribed) {
          setVessels(vessels)
          setFetchErr(false)
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setFetchErr(true)
        }
      })

    return () => isSubscribed = false
  }

  useEffect(refreshVessels, [])

  const setVessel = (vessel) => {
    let headerColor = 'bg-ferry-red'
    if (vessel.isInService()) {
      headerColor = vessel.isDelayed() ? 'bg-ferry-yellow' : 'bg-ferry-green'
    }

    return () => {
      if (activePane && activePane.vesselID === vessel.id) {
        setActivePane(null)
      } else {
        setActivePane({
          component: <VesselPane vessel={vessel} />,
          header: vessel.name,
          headerColor,
          vesselID: vessel.id,
        })
      }
    }
  }

  const setInfo = () => {
    const INFO = 'Info'

    if (activePane && activePane.header === INFO) {
      setActivePane(null)
    } else {
      setActivePane({
        component: <InfoPane />,
        header: INFO,
      })
    }
  }

  const setSettings = () => {
    const SETTINGS = 'Settings'

    if (activePane && activePane.header === SETTINGS) {
      setActivePane(null)
    } else {
      setActivePane({
        component: <SettingsPane 
                      showOutOfService={showOutOfService}
                      setShowOutOfService={setShowOutOfService} />,
        header: SETTINGS,
      })
    }
  }

  return (
    <section>
      <FetchError active={fetchErr} />
      <MapContainer zoomControl={false} center={[47.96533, -122.659685]} zoom={9}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {vessels
          .filter((v) => {
            if (!showOutOfService && !v.isInService()) {
              return false
            }

            return true
          })
          .map((v) => {
          const isSelected = activePane && activePane.vesselID === v.id
          const { icon, alt } = makeIcon(v.status(), isSelected)

          return (
            <Marker
              alt={alt}
              key={v.id}
              icon={icon}
              position={[v.lat, v.lon]}
              zIndexOffset={isSelected ? 1000 : 1}
              eventHandlers={{ mousedown: setVessel(v) }}
            />
          )
        })}
      </MapContainer>
      <FixedControls 
        refreshVessels={refreshVessels} 
        setInfo={setInfo} 
        setSettings={setSettings} />
      {activePane && (
        <BottomPane
          toRender={activePane.component}
          header={activePane.header}
          headerColor={activePane.headerColor}
        />
      )}
    </section>
  )
}
