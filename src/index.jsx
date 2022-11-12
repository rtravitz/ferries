import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import { worker } from './mocks/browser'

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
