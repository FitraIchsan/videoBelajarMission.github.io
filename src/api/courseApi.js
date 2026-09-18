import axiosClient from './axiosClient';

const courseApi = {
  getAllCourses: async () => {
    try {
      const response = await axiosClient.get('/courses');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default courseApi;