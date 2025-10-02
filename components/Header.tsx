import { Heading2, Icon, IconName, spacing } from "@/design-system";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { title: string; subButtonIcon?: IconName; onPressSubButton?: () => void; shownBackButton?: boolean; onPressBackButton?: () => void };

export default function Header({
    title,
    subButtonIcon,
    onPressSubButton,
    shownBackButton = false,
    onPressBackButton = () => {
        router.back();
    },
}: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingBottom: 16,
                    paddingTop: 16,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                    {shownBackButton && (
                        <Pressable
                            style={{
                                width: 34,
                                height: 34,
                                backgroundColor: "#F8F9FA",
                                borderRadius: 17,
                                borderWidth: 1,
                                borderColor: "#E8E8E8",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={onPressBackButton}
                        >
                            <Icon name="chevron-left" size={20} color="#6C757D" />
                        </Pressable>
                    )}
                    <Heading2 color="#B19CD9">{title}</Heading2>
                </View>

                {subButtonIcon && (
                    <Pressable
                        style={{
                            width: 34,
                            height: 34,
                            backgroundColor: "#F8F9FA",
                            borderRadius: 17,
                            borderWidth: 1,
                            borderColor: "#E8E8E8",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={onPressSubButton}
                    >
                        <Icon name={subButtonIcon} size={20} color="#6C757D" />
                    </Pressable>
                )}
            </View>
        </View>
    );
}
