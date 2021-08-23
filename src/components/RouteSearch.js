import React, { useState } from 'react'
import terminals from '../data/terminals.json'
import AutocompleteBox from './AutocompleteBox'

const items = terminals.terminals.map(t => t.name)

function RouteSearch() {
  const [fromSelected, setFromSelected] = useState(null)
  const [toSelected, setToSelected] = useState(null)

  return (
    <div className="fixed top-4 left-2 z-40 flex flex-col">
      <AutocompleteBox items={items} label="FROM" setSelected={setFromSelected} /> 
      <AutocompleteBox items={items} label="TO" setSelected={setToSelected} />
    </div>
  )
}

export default RouteSearch

