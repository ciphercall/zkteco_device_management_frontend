import axiosInstance from '../utils/axiosInstance';

export const connectDevice = async (deviceData: { ip: string; port: number }) => {
  const response = await axiosInstance.post('/device/connect', deviceData);
  return response.data;
};

export const getDeviceInfo = async () => {
  const response = await axiosInstance.get('/device/info');
  return response.data;
};
