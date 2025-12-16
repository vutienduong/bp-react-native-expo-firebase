# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo app with Firebase backend integration, currently featuring a TODO application. The project uses:
- **Expo SDK ~54** with React Native 0.81.5
- **Expo Router** for file-based routing with typed routes
- **Firebase** (Firestore) for backend data persistence
- **React 19** with the experimental React Compiler enabled
- **React Native Reanimated** for animations
- **New Architecture** enabled (`newArchEnabled: true`)

## Development Commands

### Running the App
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
```

### Code Quality
```bash
npm run lint       # Run ESLint
npx tsc --noEmit   # TypeScript type checking
```

## Architecture

### Routing System
Uses **Expo Router** (file-based routing). Routes are automatically generated from the `app/` directory structure:
- `app/_layout.tsx` - Root layout with Stack navigator and theme provider
- `app/(tabs)/_layout.tsx` - Tab navigator configuration (bottom tabs)
- `app/(tabs)/index.tsx` - Main TODO screen (Todos tab)
- `app/(tabs)/explore.tsx` - Explore/documentation screen
- `app/modal.tsx` - Modal screen example

The `(tabs)` directory is a route group that prevents URL nesting. Typed routes are enabled via `experiments.typedRoutes: true`.

### Theming System
The app has a custom theming system that supports light and dark modes:

1. **Theme Constants** (`constants/theme.ts`):
   - Centralized color definitions in `Colors.light` and `Colors.dark`
   - Platform-specific font definitions in `Fonts`
   - Available color keys: `text`, `background`, `tint`, `icon`, `tabIconDefault`, `tabIconSelected`, `card`, `border`

2. **Theme Hook** (`hooks/use-theme-color.ts`):
   - `useThemeColor(props, colorName)` - Returns appropriate color based on device theme
   - Supports prop overrides via `{ light: '#color', dark: '#color' }`

3. **Themed Components**:
   - `ThemedText` - Theme-aware Text with preset types (default, title, subtitle, link, defaultSemiBold)
   - `ThemedView` - Theme-aware View that automatically applies background colors
   - All themed components accept `lightColor` and `darkColor` props for overrides

### Firebase Integration
Firebase is initialized in `app/_layout.tsx` by importing `@/config/firebase`.

**Configuration** (`config/firebase.ts`):
- Initializes Firebase app with `initializeApp()`
- Exports `db` (Firestore instance)
- Configuration values must be replaced with actual Firebase project credentials

**Data Layer** (`hooks/use-todos.ts`):
- Custom hook pattern for Firebase operations
- Real-time Firestore listener using `onSnapshot()`
- Provides CRUD operations: `addTodo()`, `toggleTodo()`, `deleteTodo()`, `updateTodo()`
- Returns state: `{ todos, loading, error }`
- All operations use the `todos` collection in Firestore

### Component Architecture
**Path Aliasing**: The project uses `@/*` to reference the project root (configured in `tsconfig.json`).

**Reusable Components** (`components/`):
- `todo-item.tsx` - Individual todo with checkbox and delete button
- `add-todo.tsx` - Input field with keyboard handling and submit button
- `haptic-tab.tsx` - Tab button with haptic feedback
- `parallax-scroll-view.tsx` - Advanced scroll view with parallax header (iOS-specific)
- `hello-wave.tsx` - Animated wave emoji using Reanimated
- `collapsible.tsx` - Expandable/accordion component
- `external-link.tsx` - Link component for opening external URLs
- `ui/icon-symbol.tsx` - Cross-platform SF Symbols support

### State Management
No global state management library is used. The app relies on:
- React hooks (useState, useEffect) for local component state
- Custom hooks for Firebase real-time data (`use-todos.ts`)
- React Navigation's built-in theme provider

When adding new Firebase collections, follow the pattern in `hooks/use-todos.ts`:
1. Define TypeScript interface for the data model
2. Create custom hook with real-time listener
3. Export CRUD operations and loading/error states
4. Use `onSnapshot()` for real-time updates

## Important Patterns

### Adding New Theme Colors
When adding new theme color keys:
1. Add to both `Colors.light` and `Colors.dark` in `constants/theme.ts`
2. Update the TypeScript type in `use-theme-color.ts` parameter
3. Use via `useThemeColor({}, 'newColorKey')` in components

### Creating New Screens
For new screens in the tab navigator:
1. Create file in `app/(tabs)/your-screen.tsx`
2. Add `<Tabs.Screen>` configuration in `app/(tabs)/_layout.tsx`
3. Export default React component
4. Use `ThemedView` and `ThemedText` for theme consistency

### Firebase Operations
All Firebase operations should:
- Be wrapped in try-catch blocks
- Handle errors by setting error state
- Use async/await pattern
- Include proper TypeScript types for Firestore data

## Key Files to Understand

- `app/_layout.tsx` - Root navigation and Firebase initialization
- `app/(tabs)/_layout.tsx` - Tab bar configuration and icons
- `constants/theme.ts` - All color and font definitions
- `hooks/use-theme-color.ts` - Core theming logic
- `hooks/use-todos.ts` - Firebase data access pattern (template for other collections)
- `config/firebase.ts` - Firebase initialization (needs actual credentials)

## TypeScript Configuration

Strict mode is enabled. The project uses:
- Path alias `@/*` for imports from project root
- Expo's TypeScript configuration as base
- Type checking should pass with `npx tsc --noEmit` before commits
