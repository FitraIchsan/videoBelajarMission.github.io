import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

/**
 * ForgotPassword.jsx
 * Simulasi reset password (tanpa backend).
 * User input email → tampil pesan sukses.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email wajib diisi.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Format email tidak valid.')
      return
    }

    // Simulasi kirim link reset
    setSent(true)
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <Link to="/" className="form-logo">videobelajar</Link>
      </div>

      <div className="form-card">
        <h1>Lupa Password</h1>
        <p className="form-subtitle">
          Masukkan email akunmu, kami akan kirimkan link untuk reset password.
        </p>

        {sent ? (
          <div className="form-success">
            Link reset password sudah dikirim ke <strong>{email}</strong>.
            Silakan cek inbox / folder spam kamu.
            <br /><br />
            <Link to="/login" style={{ color: '#059669', fontWeight: 600 }}>
              ← Kembali ke Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">
                E-Mail <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                aria-invalid={Boolean(error)}
                placeholder="Masukkan email"
              />
              {error && <span className="form__error">{error}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Kirim Link Reset
            </button>

            <Link to="/login" className="btn btn-secondary btn-block">
              Kembali ke Login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
