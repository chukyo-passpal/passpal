/**
 * Select Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Label } from "tamagui";
import { Select, SelectItem } from "./Select";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        items: {
            description: "Array of items to display in the select dropdown",
        },
        value: {
            description: "Currently selected value",
            control: "text",
        },
        placeholder: {
            description: "Placeholder text when no value is selected",
            control: "text",
        },
        native: {
            description: "Use native select on mobile devices",
            control: "boolean",
        },
        disabled: {
            description: "Disable the select component",
            control: "boolean",
        },
        groupLabel: {
            description: "Optional label for the select group",
            control: "text",
        },
        maxWidth: {
            description: "Maximum width of the trigger button",
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data
const fruitItems: SelectItem[] = [
    { label: "Apple", value: "apple" },
    { label: "Pear", value: "pear" },
    { label: "Blackberry", value: "blackberry" },
    { label: "Peach", value: "peach" },
    { label: "Apricot", value: "apricot" },
    { label: "Melon", value: "melon" },
    { label: "Honeydew", value: "honeydew" },
    { label: "Starfruit", value: "starfruit" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Raspberry", value: "raspberry" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Lime", value: "lime" },
    { label: "Lemon", value: "lemon" },
    { label: "Coconut", value: "coconut" },
    { label: "Guava", value: "guava" },
    { label: "Papaya", value: "papaya" },
    { label: "Orange", value: "orange" },
    { label: "Grape", value: "grape" },
    { label: "Jackfruit", value: "jackfruit" },
    { label: "Durian", value: "durian" },
];

const countryItems: SelectItem[] = [
    { label: "Japan", value: "jp" },
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
];

const languageItems: SelectItem[] = [
    { label: "日本語", value: "ja" },
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Deutsch", value: "de" },
];

/**
 * Default select with fruit items
 */
const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 16,
    },
    wideContainer: {
        width: 400,
        padding: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 16,
    },
    label: {
        flex: 1,
    },
});

export const Default: Story = {
    args: {
        items: fruitItems,
        placeholder: "Select a fruit",
        groupLabel: "Fruits",
    },
    render: function RenderDefault(args) {
        const [value, setValue] = React.useState("");
        return (
            <View style={styles.container}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};

/**
 * Select with initial value
 */
export const WithValue: Story = {
    args: {
        items: fruitItems,
        placeholder: "Select a fruit",
        groupLabel: "Fruits",
    },
    render: function RenderWithValue(args) {
        const [value, setValue] = React.useState("apple");
        return (
            <View style={styles.container}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};

/**
 * Native select variant for mobile devices
 */
export const Native: Story = {
    args: {
        items: fruitItems,
        placeholder: "Select a fruit",
        native: true,
        groupLabel: "Fruits",
    },
    render: function RenderNative(args) {
        const [value, setValue] = React.useState("");
        return (
            <View style={styles.container}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};

/**
 * Disabled select
 */
export const Disabled: Story = {
    args: {
        items: fruitItems,
        placeholder: "Select a fruit",
        disabled: true,
        groupLabel: "Fruits",
    },
    render: function RenderDisabled(args) {
        const [value, setValue] = React.useState("apple");
        return (
            <View style={styles.container}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};

/**
 * Select with custom width
 */
export const CustomWidth: Story = {
    args: {
        items: countryItems,
        placeholder: "Select a country",
        maxWidth: 300,
        groupLabel: "Countries",
    },
    render: function RenderCustomWidth(args) {
        const [value, setValue] = React.useState("");
        return (
            <View style={styles.wideContainer}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};

/**
 * Multiple selects with labels
 */
export const WithLabels: Story = {
    render: function RenderWithLabels() {
        const [fruit, setFruit] = React.useState("");
        const [country, setCountry] = React.useState("");
        const [language, setLanguage] = React.useState("");

        return (
            <View style={styles.wideContainer}>
                <View style={styles.row}>
                    <Label htmlFor="fruit-select" style={styles.label}>
                        Favorite Fruit
                    </Label>
                    <Select id="fruit-select" items={fruitItems} value={fruit} onValueChange={setFruit} placeholder="Select a fruit" groupLabel="Fruits" />
                </View>

                <View style={styles.row}>
                    <Label htmlFor="country-select" style={styles.label}>
                        Country
                    </Label>
                    <Select
                        id="country-select"
                        items={countryItems}
                        value={country}
                        onValueChange={setCountry}
                        placeholder="Select a country"
                        groupLabel="Countries"
                    />
                </View>

                <View style={styles.row}>
                    <Label htmlFor="language-select" style={styles.label}>
                        Language
                    </Label>
                    <Select
                        id="language-select"
                        items={languageItems}
                        value={language}
                        onValueChange={setLanguage}
                        placeholder="Select a language"
                        groupLabel="Languages"
                    />
                </View>
            </View>
        );
    },
};

/**
 * Comparison of custom and native variants
 */
export const CustomVsNative: Story = {
    render: function RenderCustomVsNative() {
        const [customValue, setCustomValue] = React.useState("");
        const [nativeValue, setNativeValue] = React.useState("");

        return (
            <View style={styles.wideContainer}>
                <View style={styles.row}>
                    <Label htmlFor="custom-select" style={styles.label}>
                        Custom
                    </Label>
                    <Select
                        id="custom-select"
                        items={fruitItems}
                        value={customValue}
                        onValueChange={setCustomValue}
                        placeholder="Select a fruit"
                        groupLabel="Fruits"
                    />
                </View>

                <View style={styles.row}>
                    <Label htmlFor="native-select" style={styles.label}>
                        Native
                    </Label>
                    <Select
                        id="native-select"
                        items={fruitItems}
                        value={nativeValue}
                        onValueChange={setNativeValue}
                        placeholder="Select a fruit"
                        native
                        groupLabel="Fruits"
                    />
                </View>
            </View>
        );
    },
};

/**
 * Short list of items
 */
export const ShortList: Story = {
    args: {
        items: languageItems,
        placeholder: "Select a language",
        groupLabel: "Languages",
    },
    render: function RenderShortList(args) {
        const [value, setValue] = React.useState("");
        return (
            <View style={styles.container}>
                <Select {...args} value={value} onValueChange={setValue} />
            </View>
        );
    },
};
