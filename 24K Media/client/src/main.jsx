import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { SiteProvider } from './context/SiteContext.jsx'
import './styles/index.css'
import './styles/components.css'
import './styles/premium.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SiteProvider>
          <App />
        </SiteProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
