import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Ambil data user dari localStorage saat pertama kali aplikasi dibuka
  useEffect(() => {
    const saved = localStorage.getItem('vb_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('vb_user')
      }
    }
  }, [])

  function login(userData) {
    const newUser = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      phone: userData.phone || '',
      avatar: userData.avatar || 'https://i.pravatar.cc/150?img=47',
    }
    setUser(newUser)
    localStorage.setItem('vb_user', JSON.stringify(newUser))
  }

  function register(userData) {
    login({
      name: userData.name,
      email: userData.email,
    })
  }

  // --- FUNGSI UTAMA UNTUK UPDATE PROFIL ---
  function updateProfile(updatedData) {
    setUser((prevUser) => {
      // Gabungkan data lama dengan data baru yang diubah user
      const newUserData = {
        ...prevUser,
        ...updatedData,
      }
      // Simpan permanen ke localStorage agar tidak berubah saat pindah halaman / refresh
      localStorage.setItem('vb_user', JSON.stringify(newUserData))
      return newUserData
    })
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('vb_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}