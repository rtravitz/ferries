import '@testing-library/jest-dom';
import fetch from 'node-fetch';

process.env.VITE_BACKEND = 'http://localhost:5273/api/vessels';
process.env.VITE_LOADING_SCREEN_DURATION = 1;

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
window.fetch = fetch;

// Uncomment the following to reduce testing library error output.
// Useful for reducing DOM noise when debugging msw matching errors.

// import { configure } from '@testing-library/dom'
// configure({
//   getElementError: (message, container) => {
//     const error = new Error(message);
//     error.name = 'TestingLibraryElementError';
//     error.stack = null;
//     return error;
//   },
// });
