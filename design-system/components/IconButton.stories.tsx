/**
 * IconButton Component Stories
 * Demonstrates all variants, sizes, and states of the IconButton
 */

import React from "react";
import { View } from "react-native";
import { IconButton, DefaultIconButton, PrimaryIconButton, GhostIconButton } from "./IconButton";
import { Typography } from "./Typography";

export default {
    title: "Components/IconButton",
    component: IconButton,
};

// All Variants
export const AllVariants = () => (
    <View style={{ padding: 20, gap: 32 }}>
        <View>
            <Typography variant="h3" style={{ marginBottom: 16 }}>
                Default Variant
            </Typography>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <IconButton icon="chevron-left" variant="default" size="small" />
                <IconButton icon="chevron-left" variant="default" size="medium" />
                <IconButton icon="chevron-left" variant="default" size="large" />
            </View>
        </View>

        <View>
            <Typography variant="h3" style={{ marginBottom: 16 }}>
                Primary Variant
            </Typography>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <IconButton icon="check" variant="primary" size="small" />
                <IconButton icon="check" variant="primary" size="medium" />
                <IconButton icon="check" variant="primary" size="large" />
            </View>
        </View>

        <View>
            <Typography variant="h3" style={{ marginBottom: 16 }}>
                Ghost Variant
            </Typography>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <IconButton icon="settings" variant="ghost" size="small" />
                <IconButton icon="settings" variant="ghost" size="medium" />
                <IconButton icon="settings" variant="ghost" size="large" />
            </View>
        </View>
    </View>
);

// All Sizes
export const AllSizes = () => (
    <View style={{ padding: 20 }}>
        <Typography variant="h3" style={{ marginBottom: 16 }}>
            Size Comparison
        </Typography>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <View style={{ alignItems: "center", gap: 8 }}>
                <IconButton icon="home" size="small" />
                <Typography variant="caption">Small (28px)</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <IconButton icon="home" size="medium" />
                <Typography variant="caption">Medium (34px)</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <IconButton icon="home" size="large" />
                <Typography variant="caption">Large (44px)</Typography>
            </View>
        </View>
    </View>
);

// Different Icons
export const DifferentIcons = () => (
    <View style={{ padding: 20 }}>
        <Typography variant="h3" style={{ marginBottom: 16 }}>
            Common Icons
        </Typography>
        <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
            <IconButton icon="chevron-left" />
            <IconButton icon="chevron-right" />
            <IconButton icon="home" />
            <IconButton icon="calendar" />
            <IconButton icon="user" />
            <IconButton icon="settings" />
            <IconButton icon="bell" />
            <IconButton icon="check" />
            <IconButton icon="log-out" />
            <IconButton icon="info" />
        </View>
    </View>
);

// Disabled State
export const DisabledState = () => (
    <View style={{ padding: 20, gap: 24 }}>
        <View>
            <Typography variant="h3" style={{ marginBottom: 16 }}>
                Enabled vs Disabled
            </Typography>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <View style={{ alignItems: "center", gap: 8 }}>
                    <IconButton icon="check" variant="default" />
                    <Typography variant="caption">Enabled</Typography>
                </View>
                <View style={{ alignItems: "center", gap: 8 }}>
                    <IconButton icon="check" variant="default" disabled />
                    <Typography variant="caption">Disabled</Typography>
                </View>
            </View>
        </View>

        <View>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <View style={{ alignItems: "center", gap: 8 }}>
                    <IconButton icon="check" variant="primary" />
                    <Typography variant="caption">Enabled</Typography>
                </View>
                <View style={{ alignItems: "center", gap: 8 }}>
                    <IconButton icon="check" variant="primary" disabled />
                    <Typography variant="caption">Disabled</Typography>
                </View>
            </View>
        </View>
    </View>
);

// Interactive Example
export const Interactive = () => {
    const [count, setCount] = React.useState(0);

    return (
        <View style={{ padding: 20, gap: 16, alignItems: "center" }}>
            <Typography variant="h3">Interactive Counter</Typography>
            <Typography variant="body">Press count: {count}</Typography>
            <View style={{ flexDirection: "row", gap: 12 }}>
                <IconButton icon="chevron-left" variant="default" onPress={() => setCount(count - 1)} />
                <IconButton icon="refresh-cw" variant="primary" onPress={() => setCount(0)} />
                <IconButton icon="chevron-right" variant="default" onPress={() => setCount(count + 1)} />
            </View>
        </View>
    );
};

// Usage Example (Based on your provided code)
export const UsageExample = () => {
    const handleBackPress = () => {
        console.log("Back button pressed");
    };

    return (
        <View style={{ padding: 20, gap: 16 }}>
            <Typography variant="h3" style={{ marginBottom: 8 }}>
                Usage Example
            </Typography>
            <Typography variant="body" style={{ marginBottom: 16 }}>
                This matches the design from your code snippet:
            </Typography>

            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                {/* Original design */}
                <View style={{ alignItems: "center", gap: 8 }}>
                    <IconButton icon="chevron-left" variant="default" size="medium" onPress={handleBackPress} />
                    <Typography variant="caption">IconButton</Typography>
                </View>
            </View>
        </View>
    );
};

// Convenience Components
export const ConvenienceComponents = () => (
    <View style={{ padding: 20 }}>
        <Typography variant="h3" style={{ marginBottom: 16 }}>
            Convenience Components
        </Typography>
        <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ alignItems: "center", gap: 8 }}>
                <DefaultIconButton icon="chevron-left" />
                <Typography variant="caption">Default</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <PrimaryIconButton icon="check" />
                <Typography variant="caption">Primary</Typography>
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
                <GhostIconButton icon="settings" />
                <Typography variant="caption">Ghost</Typography>
            </View>
        </View>
    </View>
);
