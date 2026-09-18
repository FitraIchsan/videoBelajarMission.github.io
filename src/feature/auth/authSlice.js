import { createContext, useContext, useState, useEffect } from 'react'
import { createSlice } from '@reduxjs/toolkit'

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

const savedUser = localStorage.getItem('vb_user')

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = {
        name: action.payload.name || action.payload.email.split('@')[0],
        email: action.payload.email,
        phone: action.payload.phone || '',
        avatar: action.payload.avatar || 'https://i.pravatar.cc/150?img=47',
      }

      state.user = user
      localStorage.setItem('vb_user', JSON.stringify(user))
    },

    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }

      localStorage.setItem('vb_user', JSON.stringify(state.user))
    },

    logout: (state) => {
      state.user = null
      localStorage.removeItem('vb_user')
    },
  },
})

export const { login, updateProfile, logout } = authSlice.actions
export default authSlice.reducer