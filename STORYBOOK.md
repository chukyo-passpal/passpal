# PassPal Design System Storybook

A comprehensive Storybook setup for the PassPal Design System that showcases all components, design tokens, and usage patterns.

## What's Included

### Components
- **Button** - Primary, secondary, and text button variants with different sizes and states
- **IconButton** - Circular icon-only buttons with default, primary, and ghost variants
- **Typography** - Complete text hierarchy with all available variants
- **Card** - Flexible containers with headers, content, and specialized variants
- **Input** - Form inputs with labels, icons, validation, and password support
- **Icon** - Icon system with preset icons and customizable sizes
- **Navigation** - Tab navigation, bottom navigation, and header components

### Design Tokens
- **Colors** - Complete color palette including primary, background, text, border, and neutral colors
- **Typography** - Text styles, font sizes, line heights, and weights
- **Spacing** - Spacing scale and border radius values

### Features
- 📱 **React Native Compatible** - All stories work in React Native environment
- 🎨 **Interactive Examples** - Live components with controls and state management
- 📚 **Comprehensive Documentation** - Each component includes usage examples and prop descriptions
- 🔍 **Real-world Patterns** - Login forms, dashboard cards, and common UI patterns
- 🎯 **Focused Organization** - Stories grouped by component type and design tokens

## Story Files

### Component Stories
- `design-system/components/Button.stories.tsx` - Button component variations
- `design-system/components/IconButton.stories.tsx` - Icon button component with circular design
- `design-system/components/Typography.stories.tsx` - Typography scale and text components
- `design-system/components/Card.stories.tsx` - Card layouts and variants
- `design-system/components/Icon.stories.tsx` - Icon showcase and usage
- `design-system/components/Input.stories.tsx` - Form inputs and validation
- `design-system/components/Navigation.stories.tsx` - Navigation components

### Design Token Stories
- `design-system/tokens/Colors.stories.tsx` - Color palette showcase
- `design-system/tokens/Typography.stories.tsx` - Typography scale and specs
- `design-system/tokens/Spacing.stories.tsx` - Spacing and border radius values

### Overview
- `design-system/Overview.stories.tsx` - Complete design system showcase
- `StorybookMain.tsx` - Main storybook entry component

## Usage

### Development
```bash
# Install dependencies
bun install

# Start the development server (web view)
bun run storybook
```

### Viewing Stories

The Storybook includes multiple ways to view the design system:

1. **Complete Overview** - See all components together in a comprehensive showcase
2. **Individual Components** - Browse specific component stories with interactive controls
3. **Design Tokens** - View color palettes, typography scales, and spacing values
4. **Usage Patterns** - Real-world examples like login forms and dashboard layouts

### Adding New Stories

To add stories for new components:

1. Create a new `.stories.tsx` file next to your component
2. Follow the existing story structure with meta configuration
3. Include multiple story variations (default, with props, interactive examples)
4. Add proper TypeScript types and Storybook controls
5. Update the main configuration to include the new stories

### Story Structure

Each story file follows this pattern:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ComponentName, ThemeProvider } from '../index';

const meta: Meta<typeof ComponentName> = {
  title: 'Design System/ComponentName',
  component: ComponentName,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  // ... configuration
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const DefaultExample: Story = {
  args: {
    // component props
  },
};
```

## Configuration

- `.storybook/main.ts` - Main Storybook configuration
- `.storybook/Storybook.tsx` - Storybook UI wrapper with theme provider
- `StorybookMain.tsx` - Standalone storybook showcase component

## Dependencies

The Storybook setup uses:
- `@storybook/react-native` - Core Storybook for React Native
- `@storybook/addon-controls` - Interactive component controls
- `@storybook/addon-actions` - Action logging
- `@storybook/addon-docs` - Documentation generation

## Theme Integration

All stories are wrapped with the ThemeProvider to ensure consistent theming and access to design tokens. Components automatically inherit the correct colors, typography, and spacing from the theme.

## Best Practices

1. **Always wrap stories with ThemeProvider**
2. **Include multiple variants** - show different states and configurations
3. **Add interactive examples** - use state management for dynamic behavior
4. **Document props and usage** - include clear descriptions and examples
5. **Test edge cases** - show loading, error, and disabled states
6. **Group related stories** - organize by component family or usage pattern

This Storybook provides a complete reference for the PassPal Design System, making it easy for developers to discover, understand, and implement the design system components correctly.
