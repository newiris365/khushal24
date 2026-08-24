import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { apiPost } from './api';

/**
 * Initialize Capacitor Push Notifications for native mobile devices (iOS / Android)
 * Registers FCM token with backend notifications API.
 */
export async function initPushNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('[Push] Skipping push notification init on web browser platform');
    return;
  }

  try {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      console.warn('[Push] Push notification permission denied by user');
      return;
    }

    await PushNotifications.register();

    // On registration success, transmit FCM token to IRIS 365 backend API
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('[Push] FCM Token received:', token.value);
      try {
        await apiPost('/core/device-tokens', {
          token: token.value,
          platform: Capacitor.getPlatform()
        });
      } catch (err) {
        console.error('[Push] Failed to register FCM token with backend:', err);
      }
    });

    PushNotifications.addListener('registrationError', (error: unknown) => {
      console.error('[Push] FCM Registration Error:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: unknown) => {
      console.log('[Push] Notification received while app active:', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('[Push] Notification action performed:', action);
    });
  } catch (err) {
    console.error('[Push] Error initializing native push notifications:', err);
  }
}
