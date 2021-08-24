import React, { useState } from 'react'
import terminals from '../data/terminals.json'
import AutocompleteBox from './AutocompleteBox'

const items = terminals.terminals.map(t => t.name)

function RouteSearch() {
  const [originSelected, setOriginSelected] = useState('')
  const [destinationSelected, setDestinationSelected] = useState('')

  return (
    <div className="fixed top-4 left-2 z-40 flex flex-col">
      <AutocompleteBox
        items={items}
        label="ORIGIN"
        selected={originSelected}
        setSelected={setOriginSelected} />
      <AutocompleteBox
        items={items}
        label="DESTINATION"
        selected={destinationSelected}
        setSelected={setDestinationSelected} />
    </div>
  )
}

export default RouteSearch

