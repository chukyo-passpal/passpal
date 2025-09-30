# Codebase Structure

## Root Directory Structure
```
passpal_reactnative/
├── app/                    # Main application code (Expo Router)
│   ├── _layout.tsx        # Root layout component
│   └── index.tsx          # Home screen component
├── assets/                # Static assets
│   └── images/           # App icons, images, splash screens
├── .expo/                # Expo configuration and cache (gitignored)
├── .git/                 # Git repository
├── .vscode/              # VS Code configuration
├── node_modules/         # Dependencies (gitignored)
├── app.json              # Expo app configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
├── bun.lock             # Bun lockfile
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## Application Structure (app/ directory)
Uses Expo Router's file-based routing system:

- **`_layout.tsx`**: Root layout component that wraps all screens
- **`index.tsx`**: Home/landing screen (automatically becomes route "/")
- **Future screens**: Add new `.tsx` files to create new routes
- **Nested routing**: Create directories for nested routes

## Key File Purposes

### Configuration Files
- **`app.json`**: Expo app metadata, build settings, plugins
- **`package.json`**: Dependencies, scripts, project metadata
- **`tsconfig.json`**: TypeScript compiler options and paths
- **`eslint.config.js`**: Code linting rules and configuration

### Application Files
- **`app/_layout.tsx`**: Navigation structure using Stack navigator
- **`app/index.tsx`**: Main screen with basic React Native components

### Assets Organization
- **`assets/images/`**: App icons for different platforms and screen sizes
  - Platform-specific icons (Android adaptive icons)
  - Web favicon
  - Splash screen assets

## Routing Pattern
Expo Router automatically creates routes based on file structure:
- `app/index.tsx` → `/` (home route)
- `app/about.tsx` → `/about`
- `app/settings/index.tsx` → `/settings`
- `app/settings/profile.tsx` → `/settings/profile`

## Development vs Production Structure
- **Development**: All source files in TypeScript, hot reloading enabled
- **Production**: Compiled to optimized bundles for each platform
- **Build outputs**: Generated in platform-specific directories (ios/, android/, dist/)

## Current State
- Minimal starter structure with 2 main files
- Ready for expansion with additional screens and features
- Standard Expo project organization for scalability