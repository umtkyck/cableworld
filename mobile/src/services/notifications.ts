import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class NotificationService {
  constructor() {
    // Configure push notifications
    PushNotification.configure({
      onRegister: (token) => {
        console.log('FCM Token:', token);
        // Send token to backend
      },

      onNotification: (notification) => {
        console.log('Notification:', notification);

        // Handle notification tap
        if (notification.userInteraction) {
          this.handleNotificationTap(notification);
        }

        // Required for iOS
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'cableworld-default',
          channelName: 'CableWorld Notifications',
          channelDescription: 'Order updates and notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }
  }

  handleNotificationTap(notification: any) {
    // Handle navigation based on notification type
    const {type, data} = notification;

    switch (type) {
      case 'order_update':
        // Navigate to order details
        break;
      case 'quote_ready':
        // Navigate to quote details
        break;
      case 'shipment_update':
        // Navigate to tracking
        break;
      default:
        break;
    }
  }

  // Local notification
  showLocalNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: 'cableworld-default',
      title,
      message,
      playSound: true,
      soundName: 'default',
    });
  }

  // Schedule notification
  scheduleNotification(title: string, message: string, date: Date) {
    PushNotification.localNotificationSchedule({
      channelId: 'cableworld-default',
      title,
      message,
      date,
      playSound: true,
      soundName: 'default',
    });
  }

  // Cancel all notifications
  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  // Request permissions (iOS)
  async requestPermissions() {
    if (Platform.OS === 'ios') {
      return new Promise((resolve) => {
        PushNotification.checkPermissions((permissions) => {
          if (!permissions.alert) {
            PushNotification.requestPermissions().then(resolve);
          } else {
            resolve(permissions);
          }
        });
      });
    }
    return true;
  }
}

export default new NotificationService();
