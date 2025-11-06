# CableWorld Mobile App

React Native mobile application for iOS and Android.

## 🚀 Features

- ✅ **Authentication** - Login, Signup, Welcome screens
- ✅ **Home Dashboard** - Stats, recent orders, quick actions
- ✅ **Quote System** - Upload diagrams, camera capture, file picker
- ✅ **Orders Management** - List, details, tracking
- ✅ **User Profile** - Settings, preferences, account info
- ✅ **Push Notifications** - Real-time order updates
- ✅ **Offline Support** - Cache and queue functionality
- ✅ **Dark Mode Ready** - Theme system prepared

## 📱 Screenshots

Coming soon...

## 🔧 Tech Stack

- React Native 0.73
- TypeScript
- React Navigation 6
- React Native Vector Icons
- React Native Image Picker
- React Native Document Picker
- React Native Camera
- Push Notifications
- AsyncStorage
- Axios

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Install dependencies
npm install

# iOS only - install pods
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/           # All app screens
│   │   ├── auth/         # Authentication screens
│   │   ├── main/         # Main tab screens
│   │   ├── quote/        # Quote flow screens
│   │   └── orders/       # Order management screens
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation configuration
│   ├── services/         # API and services
│   ├── theme/            # Design system
│   └── utils/            # Utility functions
├── ios/                  # iOS native code
├── android/              # Android native code
└── App.tsx               # App entry point
```

## 🎨 Design System

### Colors
- Primary: #092c47 (Dark Blue)
- Accent Green: #13bf87
- Accent Yellow: #ffc118
- Accent Blue: #4800e3

### Typography
- Font: System default (San Francisco on iOS, Roboto on Android)
- Sizes: xs(12), sm(14), base(16), lg(18), xl(20), xxl(24), xxxl(32), display(40)

## 📝 Screens Completed

### ✅ Authentication (100%)
- [x] Welcome Screen
- [x] Login Screen
- [x] Signup Screen

### ✅ Main Tabs (100%)
- [x] Home Screen
- [x] Quote Screen
- [x] Orders Screen
- [x] Profile Screen

### ✅ Quote Flow (100%)
- [x] Camera Screen
- [x] Upload Screen
- [x] Review Screen
- [x] Quote Details Screen

### ✅ Orders (100%)
- [x] Order Details Screen
- [x] Tracking Screen

## 🔌 API Integration

API service is located in `src/services/api.ts`:

```typescript
import APIService from '@services/api';

// Login
const user = await APIService.login(email, password);

// Get orders
const orders = await APIService.getOrders();

// Upload file
const result = await APIService.uploadFile(file);
```

## 🔔 Push Notifications

Notifications are configured in `src/services/notifications.ts`:

```typescript
import NotificationService from '@services/notifications';

// Show local notification
NotificationService.showLocalNotification('Title', 'Message');

// Request permissions (iOS)
await NotificationService.requestPermissions();
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🚢 Building for Production

### iOS

```bash
cd ios
xcodebuild -workspace CableWorld.xcworkspace \
  -scheme CableWorld \
  -configuration Release \
  archive
```

### Android

```bash
cd android
./gradlew assembleRelease
```

## 📦 Environment Variables

Create `.env` file:

```env
API_URL=https://api.cableworld.com
GOOGLE_MAPS_API_KEY=your_key_here
```

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines.

## 📄 License

Copyright © 2024 CableWorld. All rights reserved.

---

**Built with ❤️ using React Native**
