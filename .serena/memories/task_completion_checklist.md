# Task Completion Checklist

## Before Completing Any Task

### Code Quality Checks
1. **Linting**: Run `bun run lint` to check for code style issues
2. **TypeScript**: Ensure no TypeScript errors with `bun tsc --noEmit` (if needed)
3. **Formatting**: Ensure code follows project conventions

### Testing (when tests are added)
Currently no test configuration exists. When tests are added:
- Run test suite before completion
- Ensure new features have appropriate test coverage
- Check that existing tests still pass

### Cross-Platform Verification
For UI/UX changes:
1. Test on iOS simulator: `bun run ios`
2. Test on Android emulator: `bun run android`  
3. Test on web browser: `bun run web`
4. Verify responsive behavior across platforms

### Code Review Preparation
1. **Self-review**: Check diff for unintended changes
2. **Documentation**: Update README.md if needed
3. **Comments**: Add JSDoc comments for complex functions
4. **Cleanup**: Remove console.logs and debug code

### Performance Considerations
- Check for potential memory leaks
- Verify smooth animations on slower devices
- Optimize images and assets if added
- Consider bundle size impact

### Git Workflow
1. **Commit Messages**: Use clear, descriptive commit messages
2. **Branch Strategy**: Follow project branching strategy
3. **Pull Request**: Create PR with proper description if applicable

## Deployment Readiness
When preparing for deployment:
1. **Environment Variables**: Ensure all sensitive data is properly configured
2. **App Store Assets**: Update app icons, splash screens if modified
3. **Version Bumping**: Update version in package.json and app.json
4. **Build Testing**: Test production builds on physical devices

## Documentation Updates
- Update component documentation if new components added
- Update README.md for significant feature additions
- Document any new environment setup requirements
- Update API documentation if backend changes are involved