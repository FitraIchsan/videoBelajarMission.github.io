import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import ProfileSidebar from '../components/ProfileSidebar'
import userApi from '../api/userApi'
import './Profil.css'
import { useSelector } from 'react-redux'

const user = useSelector((state) => state.auth.user)
const isLoggedIn = Boolean(user)

function Profil() {
  const { user, isLoggedIn, updateProfile } = useAuth()

  // Referensi untuk input file tersembunyi
  const fileInputRef = useRef(null)

  // State form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+62',
    avatar: '',
  })

  const [saving, setSaving] = useState(false)

  // Sinkronkan data form dengan user dari AuthContext
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '81234567890',
        countryCode: '+62',
        avatar: user.avatar || 'https://i.pravatar.cc/150?img=47',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // --- FUNGSI UNTUK MENANGANI PILIHAN FILE GAMBAR ---
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validasi sederhana tipe file (hanya gambar)
      if (!file.type.startsWith('image/')) {
        alert('Mohon pilih file gambar yang valid (JPG/PNG).')
        return
      }

      // Gunakan FileReader untuk mengubah gambar menjadi Base64 string
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        // Update state formData untuk avatar
        setFormData((prev) => ({ ...prev, avatar: base64String }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Fungsi saat tombol "Ganti Foto Profil" diklik
  const triggerFileSelect = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar, // Kirim avatar terbaru (berbentuk base64/url)
      }

      // 1. Update state & localStorage lewat AuthContext
      updateProfile(payload)

      // 2. (Opsional) Kirim ke MockAPI
      try {
        await userApi.updateProfile(payload)
      } catch (apiError) {
        console.warn('Gagal sync ke MockAPI, tapi lokal tersimpan:', apiError)
      }

      alert('Profil dan foto berhasil diperbarui!')
    } catch (error) {
      console.error('Gagal menyimpan profil:', error)
      alert('Terjadi kesalahan saat menyimpan profil.')
    } finally {
      setSaving(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="profile-page">
        <div className="container profile-page__container" style={{ justifyContent: 'center', textAlign: 'center', padding: '50px 0' }}>
          <div className="profile-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px' }}>
            <h2>Anda Belum Login</h2>
            <p style={{ color: '#666', margin: '15px 0 25px' }}>
              Silakan masuk terlebih dahulu untuk mengakses dan mengubah data profil Anda.
            </p>
            <Link 
              to="/login" 
              className="profile-form__submit" 
              style={{ display: 'inline-block', textDecoration: 'none', lineHeight: 'normal' }}
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container profile-page__container">
        {/* Sidebar Kiri */}
        <ProfileSidebar />

        {/* Konten Kanan */}
        <main className="profile-content">
          <div className="profile-card">
            {/* Header Profil */}
            <div className="profile-card__header">
              <div className="profile-card__avatar-wrap">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="profile-card__avatar"
                />
              </div>

              <div className="profile-card__info">
                <h1 className="profile-card__name">
                  {formData.name || 'Pengguna'}
                </h1>
                <p className="profile-card__email">
                  {formData.email || 'email@example.com'}
                </p>

                {/* Input File Tersembunyi */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                {/* Tombol yang memicu pemilihan file */}
                <button 
                  type="button" 
                  className="profile-card__change-photo"
                  onClick={triggerFileSelect}
                >
                  Ganti Foto Profil
                </button>
              </div>
            </div>

            {/* Form */}
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="profile-form__row">
                {/* Nama Lengkap */}
                <div className="profile-form__group">
                  <label htmlFor="name" className="profile-form__label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="profile-form__input profile-form__input--active"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* E-Mail */}
                <div className="profile-form__group">
                  <label htmlFor="email" className="profile-form__label">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="profile-form__input"
                    placeholder="Masukkan email"
                    required
                  />
                </div>

                {/* No. Hp */}
                <div className="profile-form__group profile-form__group--phone">
                  <label htmlFor="phone" className="profile-form__label">
                    No. Hp
                  </label>
                  <div className="profile-form__phone-wrap">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="profile-form__country"
                    >
                      <option value="+62">+62</option>
                      <option value="+60">+60</option>
                      <option value="+65">+65</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="profile-form__input profile-form__input--phone"
                      placeholder="81234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="profile-form__actions">
                <button type="submit" className="profile-form__submit" disabled={saving}>
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profil