import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import { ShopProviderWrapper } from './context/shop-context.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProviderWrapper>
      <Router>
        <App />
      </Router>
    </ShopProviderWrapper>
  </StrictMode>,
)
