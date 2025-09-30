# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled in tsconfig.json
- **Path Mapping**: `@/*` maps to project root for cleaner imports
- **File Extensions**: Use `.tsx` for React components, `.ts` for utilities

## ESLint Configuration
- **Base Config**: Uses `eslint-config-expo/flat` 
- **Ignored Directories**: `dist/*`
- **Configuration**: Follows Expo's recommended ESLint setup

## File and Directory Structure
- **App Directory**: Contains all screens and layouts (`app/`)
- **Assets**: Images and static files (`assets/`)
- **File-based Routing**: Screen components in `app/` directory automatically become routes

## React Native Component Conventions
Based on existing starter code:

### Component Structure
```tsx
import { Text, View } from "react-native";

export default function ComponentName() {
  return (
    <View style={{ /* inline styles or imported styles */ }}>
      <Text>Content</Text>
    </View>
  );
}
```

### Layout Components
- Use `Stack` from `expo-router` for navigation layouts
- Export default functions for all components
- Use PascalCase for component names

## Import Conventions
- React Native imports first
- Third-party libraries second  
- Local imports last
- Use destructuring for React Native components

## Styling Approach
- Currently using inline styles (as seen in starter code)
- StyleSheet objects can be used for better performance
- Responsive design considerations for cross-platform compatibility

## Naming Conventions
- **Files**: PascalCase for components (e.g., `ComponentName.tsx`)
- **Directories**: lowercase with hyphens if needed
- **Functions**: PascalCase for React components, camelCase for utilities
- **Variables**: camelCase

## Project-Specific Guidelines
- Use Expo Router for navigation instead of React Navigation directly
- Leverage Expo SDK modules when possible for cross-platform functionality
- Follow React Native best practices for performance
- Use TypeScript types for all props and state