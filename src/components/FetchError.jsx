import React from 'react';
import exclamation from '../assets/exclamation-outline.svg';
import { useTransition, config, a } from '@react-spring/web';

export default function FetchError({ active }) {
  const transition = useTransition(active, {
    from: { opacity: 0, y: -30 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -30 },
    config: config.molasses,
  });

  return transition(
    (styles, item) =>
      item && (
        <a.div
          className="fixed inset-x-0 inset-y-1/2 lg:w-1/4 w-3/4 mx-auto z-50 flex flex-col justify-center items-center rounded-lg shadow-lg"
          style={styles}
        >
          <div className="w-full rounded-t-lg py-1 flex items-end bg-red-700">
            <img className="h-6 mx-2" src={exclamation} alt="exclamation mark in a circle" />
            <h3 className="text-gray-200 text-xl font-bold leading-none">Uh oh...</h3>
          </div>
          <p className="text-red-700 w-full bg-gray-200 rounded-b-lg p-2">
            There was an error fetching updated vessel information.
          </p>
        </a.div>
      ),
  );
}
