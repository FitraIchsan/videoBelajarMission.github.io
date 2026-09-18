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

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (courseData, { rejectWithValue, getState }) => {
    try {
      if (getState().auth.user?.role !== 'admin') {
        return rejectWithValue('Hanya admin yang dapat menambahkan kursus.')
      }
      return await courseApi.addCourse(courseData)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue, getState }) => {
    try {
      if (getState().auth.user?.role !== 'admin') {
        return rejectWithValue('Hanya admin yang dapat mengubah kursus.')
      }
      return await courseApi.updateCourse(id, courseData)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue, getState }) => {
    try {
      if (getState().auth.user?.role !== 'admin') {
        return rejectWithValue('Hanya admin yang dapat menghapus kursus.')
      }
      return await courseApi.deleteCourse(id)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
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
      .addCase(addCourse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false
        state.data.unshift(action.payload)
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex((course) => course.id === action.payload.id)
        if (index !== -1) state.data[index] = action.payload
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter((course) => course.id !== action.payload)
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default courseSlice.reducer