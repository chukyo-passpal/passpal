import React from "react";
import { View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Card, CardHeader, CardDivider, Button, Icon, IconContainer, useTheme } from "@/design-system";

export default function HomeScreen() {
    const theme = useTheme();
    const router = useRouter();

    const handleOpenALBO = () => {
        Linking.openURL("https://albo.aitech.ac.jp/");
    };

    const handleOpenMaNaBo = () => {
        Linking.openURL("https://manabo.aitech.ac.jp/");
    };

    const handleSettingsPress = () => {
        router.push("/settings");
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: theme.spacing.md,
                    paddingTop: 48,
                    paddingBottom: theme.spacing.md,
                    backgroundColor: theme.colors.background.primary,
                }}
            >
                <Typography variant="h2" color={theme.colors.primary.main}>
                    PassPal
                </Typography>
                <TouchableOpacity
                    onPress={handleSettingsPress}
                    style={{
                        backgroundColor: "#F8F9FA",
                        borderRadius: 100,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: theme.colors.border.default,
                    }}
                >
                    <Icon name="settings" size={24} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    padding: theme.spacing.md,
                    paddingBottom: theme.spacing.xl,
                }}
            >
                {/* Welcome Message */}
                <Typography variant="h1" color={theme.colors.primary.main} style={{ marginBottom: theme.spacing.lg }}>
                    おかえりなさい!
                </Typography>

                {/* Info Cards Row */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.lg,
                    }}
                >
                    {/* Next Class Card */}
                    <View style={{ flex: 1 }}>
                        <Card
                            variant="feature"
                            style={{
                                height: 170,
                                gap: theme.spacing.md,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <Icon name="calendar" size={20} color={theme.colors.text.primary} />
                                <Typography variant="h3" color={theme.colors.text.primary}>
                                    次の授業
                                </Typography>
                            </View>
                            <CardDivider />
                            <Typography variant="h3" color={theme.colors.text.primary} style={{ textAlign: "center", flex: 1 }}>
                                アルゴリズムとデータ構造
                            </Typography>
                            <Typography variant="body" color={theme.colors.text.primary} style={{ textAlign: "center", fontWeight: "500" }}>
                                1273
                            </Typography>
                        </Card>
                    </View>

                    {/* Assignment Count Card */}
                    <View style={{ flex: 1 }}>
                        <Card
                            variant="feature"
                            style={{
                                height: 170,
                                gap: theme.spacing.md,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <Icon name="clipboard-list" size={20} color={theme.colors.text.primary} />
                                <Typography variant="h3" color={theme.colors.text.primary}>
                                    残り課題数
                                </Typography>
                            </View>
                            <CardDivider />
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Typography variant="h1" color={theme.colors.primary.main} style={{ fontSize: 48, lineHeight: 57.6 }}>
                                    12
                                </Typography>
                            </View>
                        </Card>
                    </View>
                </View>

                {/* ALBO Bulletin Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: "#F5F5F5",
                    }}
                >
                    <CardHeader title="ALBOお知らせ" icon={<Icon name="bell" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <View style={{ gap: theme.spacing.md }}>
                        {/* Bulletin Item 1 */}
                        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
                            <IconContainer name="user" size={20} variant="primary" containerStyle={{ width: 40, height: 40 }} />
                            <View style={{ flex: 1, gap: 8 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "#FEF5F5",
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                            borderRadius: 4,
                                            height: 24,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="caption" color="#E57373" style={{ fontWeight: "600" }}>
                                            重要
                                        </Typography>
                                    </View>
                                    <Typography variant="body" color={theme.colors.text.primary} style={{ flex: 1, fontWeight: "500" }}>
                                        未来の選択肢を...
                                    </Typography>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: theme.colors.primary.light,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                            borderRadius: 4,
                                            height: 20,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="caption" color={theme.colors.primary.main}>
                                            kyoumu
                                        </Typography>
                                    </View>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        1/5
                                    </Typography>
                                </View>
                            </View>
                        </View>

                        {/* Bulletin Item 2 */}
                        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
                            <IconContainer name="user" size={20} variant="primary" containerStyle={{ width: 40, height: 40 }} />
                            <View style={{ flex: 1, gap: 8 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "#FEF5F5",
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                            borderRadius: 4,
                                            height: 24,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="caption" color="#E57373" style={{ fontWeight: "600" }}>
                                            重要
                                        </Typography>
                                    </View>
                                    <Typography variant="body" color={theme.colors.text.primary} style={{ flex: 1, fontWeight: "500" }}>
                                        未来の選択肢を...
                                    </Typography>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: theme.colors.primary.light,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                            borderRadius: 4,
                                            height: 20,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="caption" color={theme.colors.primary.main}>
                                            kyoumu
                                        </Typography>
                                    </View>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        1/5
                                    </Typography>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Recent Mail Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: "#F5F5F5",
                        height: 120,
                    }}
                >
                    <CardHeader title="最近のMaNaBoメール" icon={<Icon name="user" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center", flex: 1 }}>
                        現在新しいメールはないです。
                    </Typography>
                </Card>

                {/* System News Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: "#F5F5F5",
                        height: 120,
                    }}
                >
                    <CardHeader title="MaNaBo お知らせ" icon={<Icon name="info" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center", flex: 1 }}>
                        現在お知らせはないです。
                    </Typography>
                </Card>

                {/* Portal Buttons */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.md,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Button variant="primary" size="large" fullWidth onPress={handleOpenALBO} style={{ height: 56, borderRadius: 28 }}>
                            ALBOを開く
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button variant="primary" size="large" fullWidth onPress={handleOpenMaNaBo} style={{ height: 56, borderRadius: 28 }}>
                            MaNaBoを開く
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
