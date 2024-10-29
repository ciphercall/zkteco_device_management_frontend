// app/device/page.tsx
'use client';

import { useState } from 'react';
import axiosInstance from '../../../src/utils/axiosInstance';

interface DeviceInfo {
  device_name: string;
  firmware_version: string;
  device_serial: string;
}

const DevicePage = () => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState(4370);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  const handleConnect = async () => {
    try {
      await axiosInstance.post('/device/connect', { ip, port });
      alert('Device connected successfully');
    } catch (error) {
      console.error('Device connection failed', error);
      alert('Device connection failed');
    }
  };

  const fetchDeviceInfo = async () => {
    try {
      const response = await axiosInstance.get<{ device_info: DeviceInfo }>('/device/info');
      setDeviceInfo(response.data.device_info);
    } catch (error) {
      console.error('Failed to fetch device info', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-100">
      {/* Device Connect Section */}
      <div className="w-full max-w-md p-8 space-y-4 bg-white border rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Device Connect</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">IP Address</label>
            <input
              type="text"
              placeholder="IP Address"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Port</label>
            <input
              type="number"
              placeholder="Port"
              value={port}
              onChange={(e) => setPort(parseInt(e.target.value))}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleConnect}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Connect
        </button>
      </div>

      {/* Device Info Section */}
      <div className="w-full max-w-md p-8 space-y-4 bg-white border rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Device Information</h1>

        <button
          onClick={fetchDeviceInfo}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Device Info
        </button>

        {deviceInfo && (
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Device Name:</span> {deviceInfo.device_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Firmware Version:</span> {deviceInfo.firmware_version}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Device Serial:</span> {deviceInfo.device_serial}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicePage;
