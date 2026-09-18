import axiosClient from './axiosClient';

const userApi = {
  // Ambil data profil (kita asumsikan user yang aktif memiliki id '1')
  getProfile: async () => {
    try {
      const response = await axiosClient.get('/users/1');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update data profil berdasarkan id '1'
  updateProfile: async (userData) => {
    try {
      const response = await axiosClient.put('/users/1', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userApi;