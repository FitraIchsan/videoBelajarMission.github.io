import axiosClient from './axiosClient';

const courseApi = {
  getAllCourses: async () => {
    const response = await axiosClient.get('/courses')
    return response.data
  },

  addCourse: async (courseData) => {
    const response = await axiosClient.post('/courses', courseData)
    return response.data
  },

  updateCourse: async (id, courseData) => {
    const response = await axiosClient.put(`/courses/${id}`, courseData)
    return response.data
  },

  deleteCourse: async (id) => {
    await axiosClient.delete(`/courses/${id}`)
    return id
  },
};

export default courseApi;