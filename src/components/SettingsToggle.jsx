import React from 'react';

export function SettingsToggle({ id, status, action, label }) {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer my-2">
      <div className="relative">
        <input onClick={action}
          type="checkbox"
          defaultChecked={status}
          id={id}
          className="sr-only"
        />
        <div className="block bg-gray-400 w-14 h-8 rounded-full shadow" />
        <div className="toggle-dot absolute left-1 top-1 bg-gray-200 w-6 h-6 rounded-full transition" />
      </div>
      <div className="ml-3 text-gray-700 font-medium">{label}</div>
    </label>
  );
}
