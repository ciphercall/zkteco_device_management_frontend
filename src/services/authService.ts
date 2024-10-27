import axiosInstance from '../utils/axiosInstance';

export const registerUser = async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
  const response = await axiosInstance.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};
