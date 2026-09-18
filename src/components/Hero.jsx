import { Link } from 'react-router-dom'
import '../styles/Hero.css'

/**
 * Hero.jsx
 * Section hero di paling atas homepage.
 *
 * Design: background gelap + gambar orang belajar (dengan overlay),
 * judul besar, deskripsi singkat, dan CTA button hijau.
 *
 * Kita pakai background-image via CSS agar lebih fleksibel.
 * Gambar diambil dari public/images (salah satu yang mirip theme belajar).
 */
function Hero() {
  return (
    <section className="hero">
      {/* Overlay gelap agar text tetap terbaca */}
      <div className="hero__overlay"></div>

      <div className="container hero__content">
        <h1 className="hero__title">
          Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
        </h1>
        <p className="hero__subtitle">
          Temukan ilmu baru yang menarik dan mendidik melalui video pembelajaran interaktif yang tersedia di platform ini. Tidak hanya itu,
          Anda juga dapat berpartisipasi dalam diskusi dan quiz yang akan meningkatkan pemahaman Anda.
        </p>
        <Link to="/courses" className="hero__cta">
          Temukan Video Course untuk Dipelajari
        </Link>
      </div>
    </section>
  )
}

export default Hero
