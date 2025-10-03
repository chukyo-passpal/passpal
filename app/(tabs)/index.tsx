import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Typography, Card, CardHeader, CardDivider, Button, Icon, useTheme, StatCard } from "@/design-system";
import Header from "@/components/Header";

export default function HomeScreen() {
    const { theme } = useTheme();
    const router = useRouter();

    const handleOpenALBO = () => {
        Linking.openURL("https://albo.aitech.ac.jp/");
    };

    const handleOpenMaNaBo = () => {
        Linking.openURL("https://manabo.aitech.ac.jp/");
    };

    const handleOpenSettings = () => {
        router.push("/settings");
    };

    const AlboNewsComponent = () => (
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
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
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
            <Header title="PassPal" subButtonIcon="settings" onPressSubButton={handleOpenSettings} />

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
                        <StatCard iconName="calendar" title="次の授業" content="アルゴリズムとデータ構造" subtitle="1273" />
                    </View>

                    {/* Assignment Count Card */}
                    <View style={{ flex: 1 }}>
                        <StatCard iconName="clipboard-list" title="残り課題数" content={12} largeContent />
                    </View>
                </View>

                {/* ALBO Bulletin Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: theme.colors.background.surface,
                    }}
                >
                    <CardHeader title="ALBOお知らせ" icon={<Icon name="bell" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <View style={{ gap: theme.spacing.md }}>
                        {/* Bulletin Item 1 */}
                        <AlboNewsComponent />

                        {/* Bulletin Item 2 */}
                        <AlboNewsComponent />
                    </View>
                </Card>

                {/* Recent Mail Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: theme.colors.background.surface,
                    }}
                >
                    <CardHeader title="最近のMaNaBoメール" icon={<Icon name="user" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <View style={{ gap: theme.spacing.md }}>
                        <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center", flex: 1 }}>
                            現在新しいメールはないです。
                        </Typography>
                    </View>
                </Card>

                {/* System News Card */}
                <Card
                    style={{
                        marginBottom: theme.spacing.lg,
                        backgroundColor: theme.colors.background.surface,
                    }}
                >
                    <CardHeader title="MaNaBo お知らせ" icon={<Icon name="info" size={20} color={theme.colors.text.primary} />} />
                    <CardDivider />
                    <View style={{ gap: theme.spacing.md }}>
                        <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center", flex: 1 }}>
                            現在お知らせはないです。
                        </Typography>
                    </View>
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
                        <Button variant="primary" fullWidth onPress={handleOpenALBO}>
                            ALBOを開く
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button variant="primary" fullWidth onPress={handleOpenMaNaBo}>
                            MaNaBoを開く
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
