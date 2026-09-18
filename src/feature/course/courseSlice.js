import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import courseApi from '../../api/courseApi'

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await courseApi.getAllCourses()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default courseSlice.reducer