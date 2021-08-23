import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import Vessel from '../models/Vessel'
import { makeFerryIcon, makeTerminalIcon } from '../mapIcon'
import BottomPane from './BottomPane'
import FixedControls from './FixedControls'
import RouteSearch from './RouteSearch'
import VesselPane from './VesselView'
import InfoPane from './InfoView'
import SettingsPane from './SettingsView'
import TerminalPane from './TerminalView'
import FetchError from './FetchError'
import useStickyState from '../stickyState'
import { terminals } from '../data/terminals.json'

const BACKEND = process.env.REACT_APP_BACKEND

export default function App() {
  const [vessels, setVessels] = useState([])
  const [activePane, setActivePane] = useState(null)
  const [fetchErr, setFetchErr] = useState(false)
  const [showOutOfService, setShowOutOfService] = useStickyState(false, 'showOutOfService')

  const refreshVessels = () => {
    let isSubscribed = true
    fetch(BACKEND)
      .then((res) => res.json())
      .then((res) => {
        const vessels = res.vessellist.map((v) => new Vessel(v))
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
    let headerBackground = 'bg-ferry-red'
    if (vessel.isInService()) {
      headerBackground = vessel.isDelayed() ? 'bg-ferry-yellow' : 'bg-ferry-green'
    }

    return () => {
      if (activePane && activePane.vesselID === vessel.id) {
        setActivePane(null)
      } else {
        setActivePane({
          component: <VesselPane vessel={vessel} />,
          headerText: vessel.name,
          headerBackground,
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
        headerText: INFO,
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
        headerText: SETTINGS,
      })
    }
  }

  const setTerminal = (terminal, vessels) => {
    return () => {
      if (activePane && activePane.terminalID === terminal.name) {
        setActivePane(null)
      } else {
        setActivePane({
          terminalID: terminal.name,
          headerText: terminal.name,
          headerBackground: 'bg-terminal',
          component: <TerminalPane terminal={terminal} vessels={vessels} />
        })
      }
    }
  }

  const getVesselsForTerminal = (vessels, terminalName) => vessels.filter(v => v.routeIncludesTerminal(terminalName))

  return (
    <section>
      <FetchError active={fetchErr} />
      {/* 
        Mobile Safari was spawning multiple click events with Leaflet, making it difficult to
        select a marker. Setting tap={false} solves, this: https://github.com/Leaflet/Leaflet/issues/7255
       */}
      <MapContainer zoomControl={false} center={[47.96533, -122.659685]} zoom={9} tap={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          terminals.map((t) => (
            <Marker 
              alt="terminal"
              position={[t.lat, t.lon]} 
              key={t.name} 
              eventHandlers={{ mousedown: setTerminal(t, getVesselsForTerminal(vessels, t.name)) }}
              icon={makeTerminalIcon()} />
          ))
        }
        {vessels
          .filter((v) => {
            if (!showOutOfService && !v.isInService()) {
              return false
            }

            return true
          })
          .map((v) => {
          const isSelected = activePane && activePane.vesselID === v.id
          const { icon, alt } = makeFerryIcon(v.status(), isSelected)

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
      <RouteSearch />
      <FixedControls 
        refreshVessels={refreshVessels} 
        setInfo={setInfo} 
        setSettings={setSettings} />
      {activePane && (
        <BottomPane
          toRender={activePane.component}
          headerText={activePane.headerText}
          headerBackground={activePane.headerBackground}
        />
      )}
    </section>
  )
}
