import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * Entry point aplikasi.
 * BrowserRouter membungkus seluruh App agar React Router bisa digunakan
 * di mana saja (Header, Link, useNavigate, dll).
 * StrictMode membantu deteksi side-effect di development.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
