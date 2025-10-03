/**
 * Input Component
 * Text input with different states and icon support
 */

import React, { useState, forwardRef } from "react";
import { View, TextInput, TextInputProps, ViewStyle, TextStyle, TouchableOpacity, StyleSheet } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useTheme } from "../tokens/ThemeProvider";

interface InputProps extends Omit<TextInputProps, "style"> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isPassword?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    onSubmit?: () => void;
    disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
    (
        {
            label,
            error,
            leftIcon,
            rightIcon,
            isPassword = false,
            containerStyle,
            inputStyle,
            value,
            placeholder,
            onFocus,
            onBlur,
            onSubmit,
            disabled = false,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();
        const [isFocused, setIsFocused] = useState(false);
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const handleFocus = (e: any) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: any) => {
            setIsFocused(false);
            onBlur?.(e);
        };

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
        };

        const handleSubmitEditing = () => {
            if (onSubmit) {
                onSubmit();
            }
        };

        // Get border color based on state
        const getBorderColor = () => {
            if (disabled) return theme.colors.border.disabled;
            if (error) return theme.colors.border.error;
            if (isFocused) return theme.colors.border.focused;
            return theme.colors.border.default;
        };

        // Get text color based on state
        const getTextColor = () => {
            if (disabled) return theme.colors.text.disabled;
            if (value) return theme.colors.text.primary;
            return theme.colors.text.placeholder;
        };

        const styles = StyleSheet.create({
            container: {
                width: "100%",
            },
            inputContainer: {
                ...theme.components.input,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: isFocused ? 2 : 1,
                borderColor: getBorderColor(),
                backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.primary,
                opacity: disabled ? 0.6 : 1,
            },
            input: {
                ...theme.typography.variants.body,
                flex: 1,
                color: getTextColor(),
                paddingVertical: 0, // Remove default padding
                marginLeft: leftIcon ? theme.spacing.sm : 0,
                marginRight: rightIcon || isPassword ? theme.spacing.sm : 0,
            },
            iconContainer: {
                justifyContent: "center",
                alignItems: "center",
            },
            leftIcon: {
                marginRight: theme.spacing.sm,
            },
            rightIcon: {
                marginLeft: theme.spacing.sm,
            },
        });

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={styles.inputContainer}>
                    {leftIcon && <View style={[styles.iconContainer, styles.leftIcon]}>{leftIcon}</View>}

                    <TextInput
                        ref={ref}
                        style={[styles.input, inputStyle]}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={theme.colors.text.placeholder}
                        secureTextEntry={isPassword && !isPasswordVisible}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSubmitEditing}
                        editable={!disabled}
                        {...props}
                    />

                    {isPassword ? (
                        <TouchableOpacity
                            style={[styles.iconContainer, styles.rightIcon]}
                            onPress={togglePasswordVisibility}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            disabled={disabled}
                        >
                            {isPasswordVisible ? (
                                <EyeOff size={20} color={disabled ? theme.colors.text.disabled : theme.colors.text.secondary} />
                            ) : (
                                <Eye size={20} color={disabled ? theme.colors.text.disabled : theme.colors.text.secondary} />
                            )}
                        </TouchableOpacity>
                    ) : rightIcon ? (
                        <View style={[styles.iconContainer, styles.rightIcon]}>{rightIcon}</View>
                    ) : null}
                </View>
            </View>
        );
    }
);

Input.displayName = "Input";
