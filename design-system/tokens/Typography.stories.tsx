import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, useTheme, Typography } from '../index';

const TypographyTokensComponent = () => {
  const theme = useTheme();

  const TypographyExample = ({ 
    variant, 
    label 
  }: { 
    variant: keyof typeof theme.typography.variants; 
    label: string;
  }) => {
    const style = theme.typography.variants[variant];
    return (
      <View style={{ marginBottom: 20, padding: 16, backgroundColor: theme.colors.background.surface, borderRadius: 8 }}>
        <Typography variant="caption" style={{ color: theme.colors.text.secondary, marginBottom: 8 }}>
          {label} - {style.fontSize}px / {style.lineHeight}px - {style.fontWeight}
        </Typography>
        <Typography variant={variant}>
          The quick brown fox jumps over the lazy dog
        </Typography>
      </View>
    );
  };

  return (
    <View style={{ padding: 16 }}>
      <Typography variant="h1" style={{ marginBottom: 24 }}>Typography Scale</Typography>
      
      <TypographyExample variant="h1" label="Heading 1" />
      <TypographyExample variant="h2" label="Heading 2" />
      <TypographyExample variant="h3" label="Heading 3" />
      <TypographyExample variant="body" label="Body Text" />
      <TypographyExample variant="bodySmall" label="Body Small" />
      <TypographyExample variant="label" label="Label" />
      <TypographyExample variant="caption" label="Caption" />
      <TypographyExample variant="button" label="Button" />
      <TypographyExample variant="buttonSmall" label="Button Small" />
    </View>
  );
};

const meta: Meta = {
  title: 'Design System/Design Tokens/Typography',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Typography scale and text styles used throughout the design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TypographyScale: Story = {
  render: () => <TypographyTokensComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Complete typography scale with all text styles and their specifications.',
      },
    },
  },
};