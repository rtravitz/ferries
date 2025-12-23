import { useContext, useEffect, useState } from "react";
import terminals from '../data/terminals.json';
import { useMap } from "react-leaflet";
import Vessel from "../models/Vessel";
import { ActivePaneContext } from "./ActivePaneContext";

interface TerminalSearchProps {
  vessels: Array<Vessel>;
}

const sortedTerminals = terminals.sort((t1, t2) => {
  if (t1.name < t2.name) {
    return -1;
  } else if (t1.name > t2.name) {
    return 1;
  } else {
    return 0;
  }
});

export function TerminalSearch(props: TerminalSearchProps) {
  const [searchVal, setSearchVal] = useState('');
  const [filteredTerminals, setFilteredTerminals] = useState(sortedTerminals);
  const map = useMap();
  const { setTerminal } = useContext(ActivePaneContext);

  useEffect(() => {
    const filtered = sortedTerminals.filter(term =>
      term.name.toLowerCase().includes(searchVal.trim().toLowerCase()));
    setFilteredTerminals(filtered);
  }, [searchVal]);

  return (
    <div>
      <input
        list="terminal-options"
        id="terminal-choice"
        placeholder="Search for a terminal..."
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
      />
      <div className="bg-slate-100 rounded-b-lg shadow p-2">
        <ul>
          {filteredTerminals.map(term =>
            <li
              onClick={() => {
                map.flyTo([term.lat, term.lon], 15);
                setTerminal(term, props.vessels)();
              }}
              value={term.name}>{term.name}</li>)}
        </ul>
      </div>
    </div>
  )
}
