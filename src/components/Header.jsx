import { useState, useRef, useEffect, useSelector } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Header.css'
import { useSelector } from 'react-redux'

/**
 * Header.jsx
 * - Belum login → tampil tombol Login + Register
 * - Sudah login → tampil "Kategori" + avatar user (mendukung foto base64/url) + dropdown menu
 * - Menu "Kategori" sekarang mengarah ke /semua-produk (baik login maupun belum)
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, isLoggedIn, logout } = useAuth()
  const userState = useSelector((state) => state.auth.user)
  const isLoggedInState = Boolean(userState)

  const dropdownRef = useRef(null)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev)
  const closeDropdown = () => setIsDropdownOpen(false)

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    closeDropdown()
    closeMenu()
  }

  return (
    <header className="header">
      <div className="container header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-text">videobelajar</span>
        </Link>

        {/* Desktop right side */}
        <div className="header__right">
          {isLoggedInState ? (
            /* ===== SUDAH LOGIN ===== */
            <div className="header__logged">
              <Link to="/semua-produk" className="header__kategori" onClick={closeMenu}>
                Kategori
              </Link>
              <div className="header__avatar-wrap" ref={dropdownRef}>
                <button
                  className="header__avatar"
                  type="button"
                  title={user?.name}
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  style={{ overflow: 'hidden', padding: 0 }} // Tambahan style agar gambar pas di dalam tombol
                >
                  {/* UPDATE: Jika user punya avatar (foto/base64), tampilkan img. Jika tidak, tampilkan inisial huruf */}
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user?.name || 'User Avatar'} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="header__dropdown">
                    <div className="header__dropdown-header">
                      <p className="header__dropdown-greeting">
                        Halo, {user?.name?.split(' ')[0] || 'User'}!
                      </p>
                    </div>
                    <nav className="header__dropdown-menu">
                      <Link
                        to="/profil"
                        className="header__dropdown-item"
                        onClick={closeDropdown}
                      >
                        <span className="header__dropdown-icon">👤</span>
                        Profil Saya
                      </Link>
                      <Link
                        to="/kelas-saya"
                        className="header__dropdown-item"
                        onClick={closeDropdown}
                      >
                        <span className="header__dropdown-icon">📚</span>
                        Kelas Saya
                      </Link>
                      <Link
                        to="/pesanan"
                        className="header__dropdown-item"
                        onClick={closeDropdown}
                      >
                        <span className="header__dropdown-icon">🧾</span>
                        Pesanan Saya
                      </Link>
                      <div className="header__dropdown-divider"></div>
                      <button
                        className="header__dropdown-item header__dropdown-item--logout"
                        onClick={handleLogout}
                      >
                        <span className="header__dropdown-icon">🚪</span>
                        Keluar
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ===== BELUM LOGIN ===== */
            <nav className="header__nav">
              <Link to="/semua-produk" className="header__kategori" onClick={closeMenu}>
                Kategori
              </Link>
              <Link to="/login" className="header__btn header__btn--outline">
                Login
              </Link>
              <Link to="/register" className="header__btn header__btn--primary">
                Register
              </Link>
            </nav>
          )}

          {/* Hamburger mobile */}
          <button
            className={`header__hamburger ${isMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        {isLoggedInState ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150?img=47'} 
                alt={user?.name} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <p className="header__mobile-user" style={{ margin: 0 }}>Halo, {user?.name}</p>
            </div>
            <Link
              to="/semua-produk"
              className="header__mobile-link"
              onClick={closeMenu}
            >
              Kategori
            </Link>
            <Link
              to="/profil"
              className="header__mobile-link"
              onClick={closeMenu}
            >
              Profil Saya
            </Link>
            <Link
              to="/kelas-saya"
              className="header__mobile-link"
              onClick={closeMenu}
            >
              Kelas Saya
            </Link>
            <Link
              to="/pesanan"
              className="header__mobile-link"
              onClick={closeMenu}
            >
              Pesanan Saya
            </Link>
            <button
              className="header__mobile-link header__mobile-link--logout"
              onClick={handleLogout}
            >
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link
              to="/semua-produk"
              className="header__mobile-link"
              onClick={closeMenu}
            >
              Kategori
            </Link>
            <Link to="/login" className="header__mobile-link" onClick={closeMenu}>
              Login
            </Link>
            <Link
              to="/register"
              className="header__mobile-link header__mobile-link--primary"
              onClick={closeMenu}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header