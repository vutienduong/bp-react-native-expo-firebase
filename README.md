# React Native Expo Firebase TODO App

A modern TODO application built with React Native, Expo, and Firebase Firestore. Features a clean interface with real-time synchronization, light/dark mode support, and cross-platform compatibility (iOS, Android, Web).

## Features

- **Real-time Sync**: Todos update instantly across all devices using Firebase Firestore
- **CRUD Operations**: Create, read, update (toggle completion), and delete todos
- **Light/Dark Mode**: Automatic theme switching based on device preferences
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Modern Stack**: Built with Expo SDK 54, React 19, and React Native's new architecture

## Tech Stack

- **React Native 0.81.5** with Expo SDK ~54
- **Expo Router** - File-based routing with typed routes
- **Firebase Firestore** - Real-time NoSQL database
- **React Native Reanimated** - Smooth animations
- **TypeScript** - Type-safe development
- **React 19** with experimental React Compiler

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- Firebase account

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

Before running the app, you need to configure Firebase:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database:
   - Go to "Firestore Database" in the Firebase console
   - Click "Create database"
   - Choose your preferred location and security rules

3. Get your Firebase configuration:
   - Go to Project Settings → General
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the `firebaseConfig` object

4. Update `config/firebase.ts` with your Firebase credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. Set Firestore security rules (for development):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   **Note**: These rules allow open access. Update them for production use.

### 3. Start the Development Server

```bash
npm start
```

This will open the Expo developer tools. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone

### Platform-Specific Commands

```bash
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
```

## Project Structure

```
bp-react-native-expo-firebase/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx              # Root layout with Firebase initialization
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── index.tsx            # TODO app main screen
│   │   └── explore.tsx          # Documentation/example screen
│   └── modal.tsx                # Example modal screen
├── components/                   # Reusable UI components
│   ├── todo-item.tsx            # Individual todo item
│   ├── add-todo.tsx             # Add todo input field
│   ├── themed-text.tsx          # Theme-aware text component
│   └── themed-view.tsx          # Theme-aware view component
├── config/
│   └── firebase.ts              # Firebase initialization
├── hooks/
│   ├── use-todos.ts             # Firebase CRUD operations hook
│   ├── use-theme-color.ts       # Theme color management
│   └── use-color-scheme.ts      # Device color scheme detection
├── constants/
│   └── theme.ts                 # Color and font definitions
└── assets/                       # Images, icons, and fonts
```

## Development

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Code Architecture

- **Routing**: File-based routing via Expo Router (routes auto-generated from `app/` directory)
- **State Management**: React hooks with custom Firebase hooks for data management
- **Theming**: Custom theme system with `ThemedText` and `ThemedView` components
- **Data Layer**: Firestore real-time listeners via custom hooks pattern

### Adding New Features

See [CLAUDE.md](./CLAUDE.md) for detailed architectural guidance on:
- Adding new Firebase collections
- Creating new screens
- Extending the theme system
- Component patterns

## How It Works

The app uses Firebase Firestore for real-time data synchronization:

1. **Data Flow**: `hooks/use-todos.ts` sets up a real-time listener to the Firestore `todos` collection
2. **Updates**: Any changes to todos (add, toggle, delete) are immediately synced to Firebase
3. **Real-time**: All connected devices receive updates instantly via Firestore's `onSnapshot()` listener
4. **Offline Support**: Firestore provides automatic offline persistence

## Building for Production

### iOS

```bash
npx expo build:ios
```

### Android

```bash
npx expo build:android
```

### Web

```bash
npx expo export:web
```

For detailed build instructions, see [Expo's build documentation](https://docs.expo.dev/build/introduction/).

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/)

## License

This project is open source and available under the MIT License.
