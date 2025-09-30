# Suggested Commands - PassPal React Native

## Development Commands

### Installation
```bash
bun install
# or
npm install
```

### Starting Development Server
```bash
# Start Expo development server
bun start
# or
npx expo start

# Platform-specific starts
bun run android    # Start on Android
bun run ios        # Start on iOS  
bun run web        # Start on Web
```

### Code Quality
```bash
# Linting
bun run lint
# or
npx expo lint
```

### Project Management
```bash
# Reset to blank project (removes starter code)
bun run reset-project
```

## Testing & Building Commands
Currently no test or build scripts are configured in package.json.

## Git Commands (macOS)
```bash
git status
git add .
git commit -m "message"
git push
git pull
git branch
git checkout <branch>
```

## System Commands (macOS)
```bash
ls -la          # List files
cd <directory>  # Change directory
grep -r "text"  # Search in files
find . -name    # Find files by name
open .          # Open current directory in Finder
```

## Expo Specific Commands
```bash
# Clear Expo cache
npx expo r -c

# Check Expo doctor
npx expo doctor

# Install Expo CLI globally
npm install -g @expo/cli
```

## Package Management (Bun)
```bash
bun add <package>        # Add dependency
bun add -d <package>     # Add dev dependency
bun remove <package>     # Remove package
bun update              # Update packages
```