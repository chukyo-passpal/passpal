import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Typography, Card, Icon, useTheme } from "@/design-system";
import { Building, Calendar, Moon, Trash2 } from "lucide-react-native";
import { useAuth } from "@/hooks/authContext";
import Header from "@/components/Header";
import { Select } from "@/design-system/components/Select";
import useSetting from "@/hooks/useSetting";

export default function Settings() {
    const { theme } = useTheme();
    const { signOut } = useAuth();
    const { campus, timetableViewMode, setCampus, setTimetableViewMode } = useSetting();

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
                <View style={{ marginBottom: theme.spacing.xl, gap: theme.spacing.xs }}>
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

                    <Card
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: theme.spacing.md,
                            height: 64,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
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
                            <Select
                                value={campus}
                                onValueChange={(value) => setCampus(value as "nagoya" | "toyota")}
                                items={[
                                    { label: "名古屋キャンパス", value: "nagoya" },
                                    { label: "豊田キャンパス", value: "toyota" },
                                ]}
                                maxWidth={160}
                            />
                        </View>
                    </Card>
                    <Card
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: theme.spacing.md,
                            height: 64,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Calendar size={24} color={theme.colors.text.primary} />
                                <Typography
                                    variant="body"
                                    style={{
                                        color: theme.colors.text.primary,
                                        fontSize: 16,
                                        fontWeight: "600",
                                        marginLeft: theme.spacing.sm,
                                    }}
                                >
                                    時間割表示
                                </Typography>
                            </View>
                            <Select
                                value={timetableViewMode}
                                onValueChange={(value) => setTimetableViewMode(value as "day" | "week")}
                                items={[
                                    { label: "1日", value: "day" },
                                    { label: "1週間", value: "week" },
                                ]}
                                maxWidth={160}
                            />
                        </View>
                    </Card>
                </View>

                {/* Data Management Section */}
                <View style={{ marginBottom: theme.spacing.xl, gap: theme.spacing.xs }}>
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
