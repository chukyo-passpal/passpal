/**
 * Select Component
 * Customizable dropdown select component with native and sheet adaptations
 */

import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import React from "react";
import type { SelectProps as TamaguiSelectProps } from "tamagui";
import { Adapt, Sheet, Select as TamaguiSelect, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export interface SelectItem {
    label: string;
    value: string;
}

export interface SelectProps extends Omit<TamaguiSelectProps, "children"> {
    /** Array of items to display in the select */
    items: SelectItem[];
    /** Current selected value */
    value?: string;
    /** Callback when value changes */
    onValueChange?: (value: string) => void;
    /** Placeholder text when no value is selected */
    placeholder?: string;
    /** Use native select on mobile */
    native?: boolean;
    /** Custom trigger component */
    trigger?: React.ReactNode;
    /** Maximum width of the trigger button */
    maxWidth?: number;
    /** Optional label for the select group */
    groupLabel?: string;
    /** Disable the select */
    disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    items,
    value,
    onValueChange,
    placeholder = "Select an option",
    native = false,
    trigger,
    maxWidth = 220,
    groupLabel,
    disabled = false,
    ...props
}) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = React.useState(value || "");

    // Update internal value when prop value changes
    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    const handleValueChange = (newValue: string) => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TamaguiSelect value={internalValue} onValueChange={handleValueChange} disablePreventBodyScroll {...props}>
            {trigger || (
                <TamaguiSelect.Trigger maxWidth={maxWidth} iconAfter={<ChevronDown color={theme.colors.text.primary} />} disabled={disabled}>
                    <TamaguiSelect.Value placeholder={placeholder} />
                </TamaguiSelect.Trigger>
            )}

            <Adapt when="maxMd" platform="touch">
                <Sheet native={native} modal dismissOnSnapToBottom animation="medium" snapPoints={[40, 40]}>
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay bg="$shadowColor" animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
                </Sheet>
            </Adapt>

            <TamaguiSelect.Content zIndex={200000}>
                <TamaguiSelect.ScrollUpButton>
                    <YStack>
                        <ChevronUp size={20} color={theme.colors.text.primary} />
                    </YStack>
                    <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={["$background", "transparent"]} />
                </TamaguiSelect.ScrollUpButton>

                <TamaguiSelect.Viewport minW={200}>
                    <TamaguiSelect.Group>
                        {groupLabel && <TamaguiSelect.Label>{groupLabel}</TamaguiSelect.Label>}
                        {items.map((item, index) => (
                            <TamaguiSelect.Item key={item.value} index={index} value={item.value}>
                                <TamaguiSelect.ItemText>{item.label}</TamaguiSelect.ItemText>
                                <TamaguiSelect.ItemIndicator marginLeft="auto">
                                    <Check size={16} color={theme.colors.text.primary} />
                                </TamaguiSelect.ItemIndicator>
                            </TamaguiSelect.Item>
                        ))}
                    </TamaguiSelect.Group>
                </TamaguiSelect.Viewport>

                <TamaguiSelect.ScrollDownButton>
                    <YStack>
                        <ChevronDown color={theme.colors.text.primary} size={20} />
                    </YStack>
                    <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={["transparent", "$background"]} />
                </TamaguiSelect.ScrollDownButton>
            </TamaguiSelect.Content>
        </TamaguiSelect>
    );
};

Select.displayName = "Select";
