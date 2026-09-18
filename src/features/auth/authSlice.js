import { createSlice } from '@reduxjs/toolkit'

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
        role: action.payload.role || 'user',
      }

      state.user = user
      localStorage.setItem('vb_user', JSON.stringify(user))
    },

    register: (state, action) => {
      const user = {
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone || '',
        avatar: action.payload.avatar || 'https://i.pravatar.cc/150?img=47',
        role: action.payload.role || 'user',
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

export const { login, register, updateProfile, logout } = authSlice.actions
export default authSlice.reducer