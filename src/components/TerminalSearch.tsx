import { useContext, useEffect, useRef, useState } from "react";
import terminals from '../data/terminals.json';
import Vessel from "../models/Vessel";
import { ActivePaneContext } from "./ActivePaneContext";
import anchor from '../assets/anchor.svg';
import { useOnClickOutside } from "../hooks";
import type { Map as LeafletMap } from 'leaflet';
import { LAT_OFFSET } from "../constants";
import { Terminal } from "../models/Terminal";

interface TerminalSearchProps {
  vessels: Array<Vessel>;
  map: LeafletMap | null;
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
  const [searching, setSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const terminalRefs = useRef<Array<HTMLLIElement | null>>([]);

  const { setTerminal } = useContext(ActivePaneContext);

  useOnClickOutside(containerRef, () => { setSearching(false); });

  useEffect(() => {
    const filtered = sortedTerminals.filter(term =>
      term.name.toLowerCase().includes(searchVal.trim().toLowerCase()));

    if (activeIndex >= filtered.length) {
      setActiveIndex(filtered.length - 1);
    }
    setFilteredTerminals(filtered);
  }, [searchVal, activeIndex, sortedTerminals]);

  const inputStyles = searching ? 'w-56' : 'w-2';
  let buttonStyles: string;
  let anchorStyles: string = '';
  if (searching && searchVal) {
    buttonStyles = 'scale-50 bg-red-out-of-service';
    anchorStyles = 'rotate-45'
  } else if (searching) {
    buttonStyles = 'scale-50 bg-blue-dock';
  } else { buttonStyles = 'scale-100 bg-green-brand'; }

  const selectListItem = (term: Terminal) => {
    if (props.map) {
      props.map.setView([term.lat - LAT_OFFSET, term.lon], 15);
    }
    setTerminal(term, props.vessels)();
    setSearching(false);
    setSearchVal('');
  }

  return (
    <div ref={containerRef} className="fixed top-4 left-2 z-[803]">
      <div className="relative">
        <input
          ref={inputRef}
          className={`transition-[width] duration-300 absolute top-3 left-3 bg-slate-transparent-100 text-base rounded-lg py-2 pl-10 focus:outline focus:outline-blue-dock ${inputStyles}`}
          list="terminal-options"
          id="terminal-choice"
          placeholder="Search for a terminal..."
          value={searchVal}
          onChange={(e) => { setSearchVal(e.target.value); }}
          onKeyDown={(e) => {
            if (!searching) {
              return;
            }

            if (e.key === 'ArrowDown') {
              e.preventDefault()
              if (filteredTerminals.length > activeIndex + 1) {
                const updatedIdx = activeIndex + 1;
                setActiveIndex(updatedIdx);
                terminalRefs.current[updatedIdx]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'center' });
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (activeIndex - 1 >= 0 && filteredTerminals.length > 0) {
                const updatedIdx = activeIndex - 1;
                setActiveIndex(updatedIdx);
                terminalRefs.current[updatedIdx]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'center' });
              }
            } else if (e.key === 'Enter') {
              e.preventDefault();
              selectListItem(filteredTerminals[activeIndex]);
              setActiveIndex(-1);
            } else if (e.key === 'Escape') {
              setActiveIndex(-1);
              setSearching(false);
            } else if (e.key === 'Home' && filteredTerminals.length > 0) {
              e.preventDefault();
              setActiveIndex(0);
            } else if (e.key === 'End' && filteredTerminals.length > 0) {
              e.preventDefault();
              setActiveIndex(filteredTerminals.length - 1);
            }
          }}
        />
        <button
          className={`transition-[transform] duration-300 absolute top-0 left-0 w-16 h-16 p-2 shadow-lg rounded-full ${buttonStyles}`}
          onClick={() => {
            if (searching && searchVal) {
              setSearchVal('');
              if (inputRef.current) {
                inputRef.current.focus();
              }
            } else if (searching) {
              setSearching(false);
            } else {
              setSearching(true);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          }}>
          <img src={anchor} className={`transition-[transform] duration-300 ${anchorStyles}`} />
        </button>
      </div>
      {
        filteredTerminals.length > 0 && searching &&
        <ul className="text-lg w-56 text-center fixed top-[4.75rem] left-5 bg-slate-100 rounded-lg shadow p-2 z-max max-h-[50vh] overflow-y-auto">
          {
            filteredTerminals.map((term, idx) => {
              return <li
                className={`cursor-pointer rounded-lg p-1 ${activeIndex === idx ? 'bg-slate-200' : ''}`}
                aria-selected={activeIndex === idx}
                tabIndex={activeIndex === idx ? 0 : -1}
                onClick={() => { selectListItem(term) }}
                ref={(el) => { terminalRefs.current[idx] = el }}
                value={term.name}>{term.name}</li>
            })
          }
        </ul>
      }
    </div>
  )
}
