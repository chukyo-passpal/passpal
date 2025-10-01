import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, useTheme, Typography } from '../index';

const SpacingTokensComponent = () => {
  const theme = useTheme();

  const SpacingExample = ({ 
    name, 
    value 
  }: { 
    name: string; 
    value: number;
  }) => (
    <View style={{ marginBottom: 16, alignItems: 'flex-start' }}>
      <Typography variant="caption" style={{ marginBottom: 8 }}>
        {name}: {value}px
      </Typography>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: value,
            height: 32,
            backgroundColor: theme.colors.primary.main,
            borderRadius: 4,
          }}
        />
        <Typography variant="bodySmall" style={{ marginLeft: 12, color: theme.colors.text.secondary }}>
          {value}px
        </Typography>
      </View>
    </View>
  );

  const BorderRadiusExample = ({ 
    name, 
    value 
  }: { 
    name: string; 
    value: number;
  }) => (
    <View style={{ marginBottom: 16, alignItems: 'flex-start' }}>
      <Typography variant="caption" style={{ marginBottom: 8 }}>
        {name}: {value}px
      </Typography>
      <View
        style={{
          width: 80,
          height: 40,
          backgroundColor: theme.colors.primary.main,
          borderRadius: value,
        }}
      />
    </View>
  );

  return (
    <View style={{ padding: 16 }}>
      <Typography variant="h1" style={{ marginBottom: 24 }}>Spacing Scale</Typography>
      
      <Typography variant="h3" style={{ marginBottom: 16 }}>Base Spacing</Typography>
      <SpacingExample name="xs" value={theme.spacing.xs} />
      <SpacingExample name="sm" value={theme.spacing.sm} />
      <SpacingExample name="md" value={theme.spacing.md} />
      <SpacingExample name="lg" value={theme.spacing.lg} />
      <SpacingExample name="xl" value={theme.spacing.xl} />
      <SpacingExample name="2xl" value={theme.spacing['2xl']} />
      <SpacingExample name="3xl" value={theme.spacing['3xl']} />

      <Typography variant="h3" style={{ marginBottom: 16, marginTop: 32 }}>Border Radius</Typography>
      <BorderRadiusExample name="sm" value={theme.spacing.borderRadius.sm} />
      <BorderRadiusExample name="md" value={theme.spacing.borderRadius.md} />
      <BorderRadiusExample name="lg" value={theme.spacing.borderRadius.lg} />
      <BorderRadiusExample name="xl" value={theme.spacing.borderRadius.xl} />
      <BorderRadiusExample name="full" value={theme.spacing.borderRadius.full} />
    </View>
  );
};

const meta: Meta = {
  title: 'Design System/Design Tokens/Spacing',
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
        component: 'Spacing scale and border radius values used throughout the design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SpacingScale: Story = {
  render: () => <SpacingTokensComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Complete spacing scale and border radius values with visual examples.',
      },
    },
  },
};