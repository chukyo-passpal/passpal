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
} from './design-system';

const StorybookMain = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', active: activeTab === 'overview' },
    { id: 'components', label: 'Components', active: activeTab === 'components' },
    { id: 'tokens', label: 'Design Tokens', active: activeTab === 'tokens' },
  ];

  return (
    <ThemeProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ padding: 20 }}>
          <Typography variant="h1" style={{ marginBottom: 8, textAlign: 'center' }}>
            PassPal Design System
          </Typography>
          <Typography variant="body" style={{ marginBottom: 24, textAlign: 'center' }}>
            Complete design system showcase and documentation
          </Typography>
          
          <TabNavigation
            tabs={tabs}
            onTabPress={(tabId: string) => setActiveTab(tabId)}
          />

          {/* Main Content */}
          <View style={{ marginTop: 32, gap: 24 }}>
            
            {/* Typography Section */}
            <Card>
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
            <Card>
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
            <Card>
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
                </View>
              </CardContent>
            </Card>

            {/* Input Section */}
            <Card>
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
            <Card>
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

          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default StorybookMain;