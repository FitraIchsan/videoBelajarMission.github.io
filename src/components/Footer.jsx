import { Link } from 'react-router-dom'
import '../styles/Footer.css'

/**
 * Footer.jsx
 * Footer multi-kolom sesuai design screenshot.
 *
 * Kolom:
 * 1. Brand + alamat + telepon
 * 2. Kategori
 * 3. Perusahaan
 * 4. Komunitas + social icons
 *
 * Semua link menggunakan <Link> agar tetap SPA (tidak full reload).
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        {/* Brand info */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">
            </span>
            <span>videobelajar</span>
          </Link>
          <p className="footer__address">
            Gali Potensi Anda Melalui Pembelajaran<br />
            Video di videobelajar!
          </p>
          <p className="footer__contact">
            Jl. Usman Effendi No.50 Lowokwaru, Malang<br />
            +62-877-7123-1234
          </p>
        </div>

        {/* Kategori */}
        <div className="footer__col">
          <h4 className="footer__heading">Kategori</h4>
          <ul className="footer__links">
            <li><Link to="/courses">Digital & Teknologi</Link></li>
            <li><Link to="/courses">Pemasaran</Link></li>
            <li><Link to="/courses">Manajemen Bisnis</Link></li>
            <li><Link to="/courses">Pengembangan Diri</Link></li>
            <li><Link to="/courses">Desain</Link></li>
          </ul>
        </div>

        {/* Perusahaan */}
        <div className="footer__col">
          <h4 className="footer__heading">Perusahaan</h4>
          <ul className="footer__links">
            <li><Link to="/">Tentang Kami</Link></li>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Kebijakan Privasi</Link></li>
            <li><Link to="/">Ketentuan Layanan</Link></li>
            <li><Link to="/">Bantuan</Link></li>
          </ul>
        </div>

        {/* Komunitas */}
        <div className="footer__col">
          <h4 className="footer__heading">Komunitas</h4>
          <ul className="footer__links">
            <li><Link to="/">Tips Sukses</Link></li>
            <li><Link to="/">Blog</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            ©2023 Gerobak Sayur All Rights Reserved.
          </p>
          <div className="footer__social">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.828L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
