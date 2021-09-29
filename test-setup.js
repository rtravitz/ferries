import '@testing-library/jest-dom'

// Fixes an error in vessels.test.js: https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import 'regenerator-runtime/runtime'

// fetch doesn't exist without polyfilling it for the tests
import 'isomorphic-fetch'

process.env.VITE_BACKEND = 'http://localhost:5000/ferries'

const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver

