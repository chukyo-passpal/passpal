import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider } from "../design-system";

const StorybookUI = () => (
    <ThemeProvider>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Storybook UI Placeholder</Text>
        </View>
    </ThemeProvider>
);

export default StorybookUI;
