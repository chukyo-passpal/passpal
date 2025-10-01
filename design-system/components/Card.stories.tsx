import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import {
  Card,
  CardHeader,
  CardContent,
  CardDivider,
  FeatureCard,
  InfoCard,
  ThemeProvider,
  Typography,
  Icon,
} from '../index';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Flexible card component for displaying content in containers with various styles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'feature', 'info'],
      description: 'Card variant style',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card variants
export const DefaultCard: Story = {
  args: {
    variant: 'default',
    children: 'Default card content',
  },
};

export const FeatureCardVariant: Story = {
  args: {
    variant: 'feature',
    children: 'Feature card content',
  },
};

export const InfoCardVariant: Story = {
  args: {
    variant: 'info',
    children: 'Info card content',
  },
};

// Card with structured content
export const CardWithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader title="Card Title" subtitle="Card subtitle" />
      <CardContent>
        <Typography>This is the main content of the card.</Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header and content sections.',
      },
    },
  },
};

export const CardWithDivider: Story = {
  render: () => (
    <Card>
      <CardHeader title="Card Title" />
      <CardDivider />
      <CardContent>
        <Typography>Content below the divider.</Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header, divider, and content.',
      },
    },
  },
};

// Preset card components
export const FeatureCardExample: Story = {
  render: () => (
    <FeatureCard
      icon="home"
      title="Feature Title"
      description="This is a description of the feature card component."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured feature card with icon, title, and description.',
      },
    },
  },
};

export const InfoCardExample: Story = {
  render: () => (
    <InfoCard
      icon="calendar"
      title="Information"
      content="This is content for the info card component."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-configured info card with icon, title, and content.',
      },
    },
  },
};

// Complex card layouts
export const ComplexCardLayout: Story = {
  render: () => (
    <Card variant="feature">
      <CardHeader title="Assignment Title" subtitle="Due: Tomorrow" />
      <CardDivider />
      <CardContent>
        <View style={{ gap: 12 }}>
          <Typography variant="body">
            Complete the React Native assignment with proper component structure.
          </Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="calendar" size={16} />
            <Typography variant="bodySmall">Estimated: 2 hours</Typography>
          </View>
        </View>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex card with multiple content sections and icons.',
      },
    },
  },
};

// Multiple cards showcase
export const CardShowcase: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <FeatureCard
        icon="home"
        title="Dashboard"
        description="View your overview and statistics"
      />
      <InfoCard
        icon="calendar"
        title="Schedule"
        content="Check your upcoming events"
      />
      <Card variant="default">
        <CardHeader title="Custom Card" />
        <CardContent>
          <Typography>A card with custom content layout</Typography>
        </CardContent>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different card types and configurations.',
      },
    },
  },
};