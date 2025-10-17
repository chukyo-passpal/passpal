import { router } from "expo-router";
import { Heading2 } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../tokens/spacing";
import { IconName } from "./Icon";
import { IconButton } from "./IconButton";

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
                    height: 68,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingBottom: 16,
                    paddingTop: 16,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                    {shownBackButton && <IconButton icon="chevron-left" onPress={onPressBackButton} />}
                    <Heading2 color="#B19CD9">{title}</Heading2>
                </View>

                {subButtonIcon && <IconButton icon={subButtonIcon} onPress={onPressSubButton} />}
            </View>
        </View>
    );
}
