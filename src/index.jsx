import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './Container/App.jsx'
import AppProvider from './AppProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
