import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'
import SemuaProduk from './pages/SemuaProduk'
import './App.css'

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="app">
        {!isAuthPage && <Header />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/semua-produk" element={<SemuaProduk />} />  {/* ← route baru */}
            <Route path="/courses" element={<SemuaProduk />} />       {/* optional: alias */}
            <Route path="*" element={<PlaceholderPage title="404 - Halaman Tidak Ditemukan" />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
    </div>
  )
}

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <div className="container">
        <h1>{title}</h1>
        <p>Halaman ini masih dalam tahap pengembangan.</p>
        <a href="/" className="btn-back">← Kembali ke Beranda</a>
      </div>
    </div>
  )
}

export default App