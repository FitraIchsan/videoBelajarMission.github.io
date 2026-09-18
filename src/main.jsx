import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store } from './store/redux/store'
/**
 * Entry point aplikasi.
 * BrowserRouter membungkus seluruh App agar React Router bisa digunakan
 * di mana saja (Header, Link, useNavigate, dll).
 * StrictMode membantu deteksi side-effect di development.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)