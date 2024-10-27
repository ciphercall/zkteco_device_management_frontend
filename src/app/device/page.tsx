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
    <div>
      <h1>Device Management</h1>
      <input type="text" placeholder="IP Address" value={ip} onChange={(e) => setIp(e.target.value)} />
      <input type="number" placeholder="Port" value={port} onChange={(e) => setPort(parseInt(e.target.value))} />
      <button onClick={handleConnect}>Connect</button>
      <button onClick={fetchDeviceInfo}>Get Device Info</button>
      {deviceInfo && (
        <div>
          <h3>Device Information:</h3>
          <p>Device Name: {deviceInfo.device_name}</p>
          <p>Firmware Version: {deviceInfo.firmware_version}</p>
          <p>Device Serial: {deviceInfo.device_serial}</p>
        </div>
      )}
    </div>
  );
};

export default DevicePage;
