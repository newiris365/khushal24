import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iris365.app',
  appName: 'IRIS 365',
  webDir: 'out',
  server: {
    url: process.env.CAPACITOR_SERVER_URL || 'https://app.iris365.io/login',
    cleartext: false,
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
