import React from 'react';
import { SettingsToggle } from './SettingsToggle';

export default function SettingsView({
  showOutOfService,
  setShowOutOfService,
  showDocks,
  setShowDocks,
}) {
  return (
    <div className="bg-gray-transparent-200 text-lg p-4 pb-8">
      <div className="flex flex-col justify-center w-full mb-12">
        <SettingsToggle
          id="outOfServiceToggle"
          status={showOutOfService}
          label="Show out of service vessels"
          action={() => { setShowOutOfService((prevState) => !prevState); }} />
        <SettingsToggle
          id="docksToggle"
          status={showDocks}
          label="Show docks"
          action={() => { setShowDocks((prevState) => !prevState); }} />
      </div>
    </div>
  );
}
