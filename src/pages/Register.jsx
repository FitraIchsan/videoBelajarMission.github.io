import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import './Auth.css'

/**
 * Register.jsx - Halaman daftar akun
 * Setelah sukses → otomatis login + redirect ke Home
 */
export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Nama lengkap wajib diisi.'

    if (!form.email.trim()) {
      next.email = 'Email wajib diisi.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Format email tidak valid.'
    }

    if (!form.phone.trim()) {
      next.phone = 'Nomor telepon wajib diisi.'
    } else if (!/^[0-9]{8,14}$/.test(form.phone)) {
      next.phone = 'Nomor telepon tidak valid (8-14 digit).'
    }

    if (!form.password) {
      next.password = 'Kata sandi wajib diisi.'
    } else if (form.password.length < 6) {
      next.password = 'Kata sandi minimal 6 karakter.'
    }

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'Konfirmasi kata sandi tidak sama.'
    }

    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate()
    setErrors(next)

    if (Object.keys(next).length === 0) {
      dispatch(register({ name: form.name, email: form.email, phone: form.phone }))
      navigate('/')
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <Link to="/" className="form-logo">videobelajar</Link>
      </div>

      <div className="form-card">
        <h1>Pendaftaran Akun</h1>
        <p className="form-subtitle">Yuk, daftarin akunmu sekarang juga!</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">
              Nama Lengkap <span className="required">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className="form__error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">
              E-Mail <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="form__error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">
              No. Hp <span className="required">*</span>
            </label>
            <div className="field__phone">
              <span className="field__phone-code">+62</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
              />
            </div>
            {errors.phone && <span className="form__error">{errors.phone}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">
              Kata Sandi <span className="required">*</span>
            </label>
            <div className="field__password">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                className="field__toggle-pw"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && <span className="form__error">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">
              Konfirmasi Kata Sandi <span className="required">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword && (
              <span className="form__error">{errors.confirmPassword}</span>
            )}

            <div className="form-forgot">
              <Link to="/forgot-password">Lupa Password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Daftar
          </button>

          <Link to="/login" className="btn btn-secondary btn-block">
            Masuk
          </Link>
        </form>

        <div className="form-divider">
          <span>atau</span>
        </div>

        <button type="button" className="btn btn-outline btn-block">
          <GoogleIcon /> Daftar dengan Google
        </button>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.3 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.3 29.7 3 24 3c-7.7 0-14.4 4.4-17.7 11.7z" />
      <path fill="#4CAF50" d="M24 45c5.6 0 10.7-2.1 14.5-5.6l-6.7-5.5C29.7 35.7 27 36.7 24 36.7c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 40.6 16.2 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.7 5.5C41.6 35.9 45 30.4 45 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  )
}
