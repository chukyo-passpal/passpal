import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  ThemeProvider,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Input,
  Icon,
  TabNavigation,
  PrimaryButton,
  SecondaryButton,
  TextButton,
  FeatureCard,
  InfoCard,
} from './index';

const DesignSystemOverviewComponent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', active: activeTab === 'overview' },
    { id: 'components', label: 'Components', active: activeTab === 'components' },
    { id: 'patterns', label: 'Patterns', active: activeTab === 'patterns' },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
      {/* Header Section */}
      <View style={{ marginBottom: 32 }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>
          PassPal Design System
        </Typography>
        <Typography variant="body" style={{ marginBottom: 24 }}>
          A comprehensive design system for the PassPal React Native application.
        </Typography>
        
        <TabNavigation
          tabs={tabs}
          onTabPress={(tabId: string) => setActiveTab(tabId)}
        />
      </View>

      {/* Typography Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader title="Typography" subtitle="Text hierarchy and styles" />
        <CardContent>
          <View style={{ gap: 12 }}>
            <Typography variant="h1">Heading 1 - Main Titles</Typography>
            <Typography variant="h2">Heading 2 - Section Titles</Typography>
            <Typography variant="h3">Heading 3 - Subsection Titles</Typography>
            <Typography variant="body">Body text for content and descriptions</Typography>
            <Typography variant="bodySmall">Small text for secondary information</Typography>
            <Typography variant="label">Label text for forms and categories</Typography>
            <Typography variant="caption">Caption text for fine print</Typography>
          </View>
        </CardContent>
      </Card>

      {/* Buttons Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader title="Buttons" subtitle="Interactive elements and actions" />
        <CardContent>
          <View style={{ gap: 16 }}>
            <View style={{ gap: 12 }}>
              <PrimaryButton>Primary Button</PrimaryButton>
              <SecondaryButton>Secondary Button</SecondaryButton>
              <TextButton>Text Button</TextButton>
            </View>
            
            <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </View>
            
            <View style={{ gap: 12 }}>
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Cards Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader title="Cards" subtitle="Content containers and layouts" />
        <CardContent>
          <View style={{ gap: 16 }}>
            <FeatureCard
              icon="home"
              title="Feature Card"
              description="Highlights important features and functionality"
            />
            
            <InfoCard
              icon="calendar"
              title="Info Card"
              content="Displays informational content in a structured format"
            />
            
            <Card variant="feature">
              <CardHeader title="Custom Card" subtitle="Flexible card layouts" />
              <CardContent>
                <Typography>Custom card content with any layout</Typography>
              </CardContent>
            </Card>
          </View>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader title="Inputs" subtitle="Form controls and data entry" />
        <CardContent>
          <View style={{ gap: 16 }}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              leftIcon={<Icon name="user" size={20} />}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              isPassword={true}
            />
            
            <Input
              label="Location"
              placeholder="Search location"
              rightIcon={<Icon name="map-pin" size={20} />}
            />
          </View>
        </CardContent>
      </Card>

      {/* Icons Section */}
      <Card style={{ marginBottom: 24 }}>
        <CardHeader title="Icons" subtitle="Visual indicators and navigation" />
        <CardContent>
          <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="home" size={24} />
              <Typography variant="caption">Home</Typography>
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="calendar" size={24} />
              <Typography variant="caption">Calendar</Typography>
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="user" size={24} />
              <Typography variant="caption">User</Typography>
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="settings" size={24} />
              <Typography variant="caption">Settings</Typography>
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="bus" size={24} />
              <Typography variant="caption">Transport</Typography>
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Icon name="clipboard-list" size={24} />
              <Typography variant="caption">Tasks</Typography>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Component Showcase */}
      <Card>
        <CardHeader title="Component Showcase" subtitle="Real-world usage examples" />
        <CardContent>
          <View style={{ gap: 16 }}>
            {/* Login Form Example */}
            <View>
              <Typography variant="h3" style={{ marginBottom: 16 }}>
                Login Form Example
              </Typography>
              <View style={{ gap: 12 }}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  leftIcon={<Icon name="user" size={20} />}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  isPassword={true}
                />
                <PrimaryButton fullWidth>Sign In</PrimaryButton>
                <TextButton>Forgot Password?</TextButton>
              </View>
            </View>

            {/* Dashboard Cards Example */}
            <View style={{ marginTop: 24 }}>
              <Typography variant="h3" style={{ marginBottom: 16 }}>
                Dashboard Cards
              </Typography>
              <View style={{ gap: 12 }}>
                <FeatureCard
                  icon="clipboard-list"
                  title="Assignments"
                  description="3 pending assignments due this week"
                />
                <InfoCard
                  icon="calendar"
                  title="Next Class"
                  content="Mathematics - Room 101 at 2:00 PM"
                />
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const meta: Meta = {
  title: 'Design System/Overview',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Complete overview of the PassPal Design System showing all components, patterns, and usage examples.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const CompleteOverview: Story = {
  render: () => <DesignSystemOverviewComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of the entire design system with real-world examples.',
      },
    },
  },
};