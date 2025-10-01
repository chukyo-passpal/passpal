import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, ThemeProvider, Icon } from '../index';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
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
        component: 'Input component with support for labels, icons, validation states, and password visibility.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    isPassword: {
      control: 'boolean',
      description: 'Password input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic Input examples
export const DefaultInput: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Name',
    value: 'John Doe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

// Password input
export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    isPassword: true,
  },
};

// Input with icons
export const WithLeftIcon: Story = {
  render: () => (
    <Input
      label="Search"
      placeholder="Search for something..."
      leftIcon={<Icon name="user" size={20} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with left icon.',
      },
    },
  },
};

export const WithRightIcon: Story = {
  render: () => (
    <Input
      label="Location"
      placeholder="Enter location"
      rightIcon={<Icon name="map-pin" size={20} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with right icon.',
      },
    },
  },
};

export const WithBothIcons: Story = {
  render: () => (
    <Input
      label="Search Location"
      placeholder="Search for a place"
      leftIcon={<Icon name="map-pin" size={20} />}
      rightIcon={<Icon name="chevron-right" size={20} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with both left and right icons.',
      },
    },
  },
};

// Interactive examples
const InteractiveInputComponent = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      label="Interactive Input"
      placeholder="Type something..."
      value={value}
      onChangeText={setValue}
    />
  );
};

export const InteractiveInput: Story = {
  render: () => <InteractiveInputComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive input with state management.',
      },
    },
  },
};

const InteractivePasswordComponent = () => {
  const [password, setPassword] = useState('');
  return (
    <Input
      label="Password"
      placeholder="Enter your password"
      value={password}
      onChangeText={setPassword}
      isPassword={true}
    />
  );
};

export const InteractivePasswordInput: Story = {
  render: () => <InteractivePasswordComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive password input with visibility toggle.',
      },
    },
  },
};

// Form example
const FormExampleComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          validateEmail(value);
        }}
        error={emailError}
        leftIcon={<Icon name="user" size={20} />}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />
    </View>
  );
};

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with validation.',
      },
    },
  },
};

// Input states showcase
export const InputStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input label="Default State" placeholder="Default input" />
      <Input label="Focused State" placeholder="This input appears focused" value="Sample text" />
      <Input label="Error State" value="invalid@email" error="Invalid email format" />
      <Input label="Disabled State" placeholder="Disabled input" editable={false} />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different input states.',
      },
    },
  },
};