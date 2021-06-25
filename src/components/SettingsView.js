import React from 'react'

export default function SettingsView({ showOutOfService, setShowOutOfService }) {
  return (
    <div className="bg-gray-transparent-200 text-lg p-4 pb-8">
      <div className="flex items-center justify-center w-full mb-12">
        <label htmlFor="outOfServiceToggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              onClick={() => { setShowOutOfService(prevState => !prevState) }}
              type="checkbox"
              defaultChecked={showOutOfService}
              id="outOfServiceToggle"
              className="sr-only" />
            <div className="block bg-gray-600 w-14 h-8 rounded-full" />
            <div className="toggle-dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
          </div>
          <div className="ml-3 text-gray-700 font-medium">Show out of service vessels</div>
        </label>
      </div>
    </div>
  )
}
