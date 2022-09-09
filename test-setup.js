import '@testing-library/jest-dom'
import fetch from 'node-fetch'

process.env.VITE_BACKEND = 'http://localhost:5273/ferries'

const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver
window.fetch = fetch

