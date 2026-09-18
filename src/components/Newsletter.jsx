import { useState } from 'react'
import '../styles/Newsletter.css'

/**
 * Newsletter.jsx
 * Section newsletter di bawah course list.
 *
 * Design: background gelap + form email + tombol Subscribe.
 * useState untuk handle input & submit sederhana (demo).
 *
 * Di production biasanya kirim ke API newsletter service.
 */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return

    // Simulasi submit
    console.log('Subscribe email:', email)
    setSubmitted(true)
    setEmail('')

    // Reset pesan sukses setelah 3 detik
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="newsletter">
      <div className="newsletter__overlay"></div>
      <div className="container newsletter__content">
        <p className="newsletter__label">NEWSLETTER</p>
        <h2 className="newsletter__title">Mau Belajar Lebih Banyak?</h2>
        <p className="newsletter__desc">
          Daftarkan dirimu untuk mendapatkan informasi terbaru dari kami dan
          penawaran spesial yang hanya tersedia untuk subscriber!
        </p>

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter__input"
            placeholder="Masukan Emailmu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email untuk newsletter"
          />
          <button type="submit" className="newsletter__btn">
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="newsletter__success">
            Terima kasih! Email kamu sudah terdaftar.
          </p>
        )}
      </div>
    </section>
  )
}

export default Newsletter
