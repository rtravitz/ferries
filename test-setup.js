const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver

