import React from 'react'

export default function TerminalView({ terminal, vessels }) {
  const outgoing = vessels.filter(v => v.lastDock === terminal.name)
  const incoming = vessels.filter(v => v.nextDock === terminal.name)

  return (
    <div className="bg-gray-transparent-200 text-lg p-4 pb-8">
      <p>This is the page for {terminal.name}!</p>
      {
        outgoing.length > 0 &&
        <>
          <p>Outgoing</p>
          <ul>
            {
              outgoing.map(v => <li key={v.id}>{JSON.stringify(v)}</li>)
            }
          </ul>
        </>
      }
      {
        incoming.length > 0 &&
        <>
          <p>Incoming</p>
          <ul>
            {
              incoming.map(v => <li key={v.id}>{JSON.stringify(v)}</li>)
            }
          </ul>
        </>
      }
    </div>
  )
}

