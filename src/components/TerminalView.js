import React from 'react'

export default function TerminalView({ terminal }) {
  return (
    <div className="bg-gray-transparent-200 text-lg p-4 pb-8">
      <p>This is the page for {terminal.name}!</p>
    </div>
  )
}

