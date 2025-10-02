import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Typography, Card, Icon, useTheme } from "@/design-system";
import { Building, ChevronDown, Moon, Trash2 } from "lucide-react-native";
import { useAuth } from "@/context/authContext";
import Header from "@/components/Header";

export default function Settings() {
    const theme = useTheme();
    const { signOut } = useAuth();

    const handleLogout = () => {
        signOut();
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background.primary,
            }}
        >
            {/* Header */}
            <Header title="設定" shownBackButton />

            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: theme.spacing.md,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Account Section */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.primary.main,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        アカウント
                    </Typography>

                    <View style={{ gap: theme.spacing.xs }}>
                        {/* Student ID Card */}
                        <Card
                            style={{
                                backgroundColor: theme.colors.background.secondary,
                                padding: theme.spacing.md,
                                marginBottom: theme.spacing.xs,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: theme.spacing.sm,
                                }}
                            >
                                <Icon name="user" size={24} color={theme.colors.text.primary} />
                                <Typography
                                    variant="body"
                                    style={{
                                        color: theme.colors.text.primary,
                                        fontSize: 16,
                                        fontWeight: "600",
                                        marginLeft: theme.spacing.sm,
                                    }}
                                >
                                    学籍番号
                                </Typography>
                            </View>
                            <Typography
                                variant="caption"
                                style={{
                                    color: theme.colors.text.secondary,
                                    fontSize: 14,
                                    fontWeight: "500",
                                }}
                            >
                                t324076
                            </Typography>
                        </Card>

                        {/* Logout Item */}
                        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
                            <Card
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: theme.spacing.md,
                                    height: 56,
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="log-out" size={24} color={theme.colors.status.error} />
                                    <Typography
                                        variant="body"
                                        style={{
                                            color: theme.colors.status.error,
                                            fontSize: 16,
                                            fontWeight: "600",
                                            marginLeft: theme.spacing.sm,
                                        }}
                                    >
                                        ログアウト
                                    </Typography>
                                </View>
                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* App Settings Section */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.primary.main,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        アプリ設定
                    </Typography>

                    <TouchableOpacity
                        onPress={() => {
                            // TODO: Campus selection functionality
                        }}
                        activeOpacity={0.7}
                    >
                        <Card
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: theme.spacing.md,
                                height: 64,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Building size={24} color={theme.colors.text.primary} />
                                <Typography
                                    variant="body"
                                    style={{
                                        color: theme.colors.text.primary,
                                        fontSize: 16,
                                        fontWeight: "600",
                                        marginLeft: theme.spacing.sm,
                                    }}
                                >
                                    キャンパス選択
                                </Typography>
                            </View>
                            <View
                                style={{
                                    backgroundColor: theme.colors.background.secondary,
                                    paddingHorizontal: theme.spacing.sm,
                                    paddingVertical: theme.spacing.xs,
                                    borderRadius: 16,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: 140,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    style={{
                                        color: theme.colors.text.primary,
                                        fontSize: 14,
                                        fontWeight: "500",
                                    }}
                                >
                                    豊田キャンパス
                                </Typography>
                                <ChevronDown size={16} color={theme.colors.text.secondary} />
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Data Management Section */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.primary.main,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        データ管理
                    </Typography>

                    <TouchableOpacity
                        onPress={() => {
                            // TODO: Clear cache functionality
                        }}
                        activeOpacity={0.7}
                    >
                        <Card
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: theme.spacing.md,
                                height: 72,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Trash2 size={24} color={theme.colors.text.primary} />
                                <View style={{ marginLeft: theme.spacing.sm }}>
                                    <Typography
                                        variant="body"
                                        style={{
                                            color: theme.colors.text.primary,
                                            fontSize: 16,
                                            fontWeight: "600",
                                            marginBottom: theme.spacing.xs,
                                        }}
                                    >
                                        キャッシュ削除
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        style={{
                                            color: theme.colors.text.secondary,
                                            fontSize: 14,
                                        }}
                                    >
                                        キャッシュされたデータを削除する
                                    </Typography>
                                </View>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Appearance Section */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.primary.main,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        外観
                    </Typography>

                    <Card
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: theme.spacing.md,
                            height: 56,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Moon size={24} color={theme.colors.text.primary} />
                            <Typography
                                variant="body"
                                style={{
                                    color: theme.colors.text.primary,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    marginLeft: theme.spacing.sm,
                                }}
                            >
                                ダークモード
                            </Typography>
                        </View>

                        <Switch />
                    </Card>
                </View>

                {/* About Section */}
                <View style={{ marginBottom: theme.spacing.xl }}>
                    <Typography
                        variant="h3"
                        style={{
                            color: theme.colors.primary.main,
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: theme.spacing.md,
                        }}
                    >
                        PassPalについて
                    </Typography>

                    <View style={{ gap: theme.spacing.xs }}>
                        <TouchableOpacity
                            onPress={() => {
                                // TODO: About app functionality
                            }}
                            activeOpacity={0.7}
                        >
                            <Card
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: theme.spacing.md,
                                    height: 72,
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="info" size={24} color={theme.colors.text.primary} />
                                    <View style={{ marginLeft: theme.spacing.sm }}>
                                        <Typography
                                            variant="body"
                                            style={{
                                                color: theme.colors.text.primary,
                                                fontSize: 16,
                                                fontWeight: "600",
                                                marginBottom: theme.spacing.xs,
                                            }}
                                        >
                                            About PassPal
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            style={{
                                                color: theme.colors.text.secondary,
                                                fontSize: 14,
                                            }}
                                        >
                                            Version 1.0.0
                                        </Typography>
                                    </View>
                                </View>
                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // TODO: License info functionality
                            }}
                            activeOpacity={0.7}
                        >
                            <Card
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: theme.spacing.md,
                                    height: 72,
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ marginLeft: theme.spacing.sm }}>
                                        <Typography
                                            variant="body"
                                            style={{
                                                color: theme.colors.text.primary,
                                                fontSize: 16,
                                                fontWeight: "600",
                                            }}
                                        >
                                            ライセンス情報
                                        </Typography>
                                    </View>
                                </View>
                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
