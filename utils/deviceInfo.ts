import * as Device from 'expo-device';
import { Platform } from 'react-native';

export const getDeviceId = async (): Promise<string> => {
  try {
    // For iOS and Android, we'll use a combination of device info
    // since IMEI requires special permissions
    const deviceName = Device.deviceName || 'Unknown';
    const modelName = Device.modelName || 'Unknown';
    const osVersion = Device.osVersion || 'Unknown';
    
    // Create a unique device identifier
    const deviceId = `${Platform.OS}-${modelName}-${deviceName}-${osVersion}`.replace(/\s+/g, '-');
    
    return deviceId;
  } catch (error) {
    console.error('Error getting device ID:', error);
    // Fallback to a random ID
    return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};