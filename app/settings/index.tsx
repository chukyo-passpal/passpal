import authServiceInstance from "@/src/domain/services/authService";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { Select } from "@/src/presentation/components/Select";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAssignment from "@/src/presentation/hooks/useAssignment";
import useAuth from "@/src/presentation/hooks/useAuth";
import useClass from "@/src/presentation/hooks/useClass";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { useToast } from "@/src/presentation/hooks/useToast";
import { PASSPAL_URLS } from "@/src/utils/urls";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Application from "expo-application";
import { router } from "expo-router";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";

export default function Settings() {
    const { theme } = useTheme();
    const toast = useToast();
    const { user, signOut, purgeCache: purgeAuthCache } = useAuth();
    const { campus, setCampus, initTimetableViewMode, setInitTimetableViewMode, reset: resetSettings } = useSetting();
    const { refetch: refetchTimetable, clear: clearTimetable } = useTimetable();
    const { clear: clearMail } = useMail();
    const { clear: clearNews } = useNews();
    const { clear: clearClass, setFromTimetable } = useClass();
    const { clear: clearAssignment } = useAssignment();

    const handleLogout = async () => {
        clearTimetable();
        clearMail();
        clearNews();
        clearClass();
        clearAssignment();

        resetSettings();

        const allowedDomain = authServiceInstance.allowedMailDomain;
        const webClientId = authServiceInstance.webClientId;
        GoogleSignin.configure({
            hostedDomain: allowedDomain,
            webClientId,
            offlineAccess: true,
        });
        await GoogleSignin.signOut();
        signOut();
    };

    const handlePurgeCache = () => {
        purgeAuthCache();
        clearMail();
        clearNews();
        clearClass();
        clearAssignment();
        alert("キャッシュを削除しました");
    };

    const handleRefetchTimetable = async () => {
        const timetable = await refetchTimetable();
        setFromTimetable(timetable);
        alert("時間割を更新しました");
    };

    const handleFeedback = () => {
        Linking.openURL(PASSPAL_URLS.feedback);
    };

    const handleContact = () => {
        Linking.openURL(PASSPAL_URLS.contact);
    };

    const handleLicenseInfo = () => {
        router.push("/license");
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
                {/* DEBUG Section */}
                {__DEV__ && (
                    <>
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
                                デバッグメニュー
                            </Typography>

                            <View style={{ gap: theme.spacing.xs }}>
                                {/* StoryBook Item */}
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push("/storybook");
                                    }}
                                    activeOpacity={0.7}
                                >
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
                                            <Typography
                                                variant="body"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                StoryBookを開く
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                                    </Card>
                                </TouchableOpacity>

                                {/* Toast Item */}
                                <TouchableOpacity
                                    onPress={() => {
                                        toast.success("これは成功のトーストです");
                                    }}
                                    activeOpacity={0.7}
                                >
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
                                            <Typography
                                                variant="body"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                トーストを表示
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                                    </Card>
                                </TouchableOpacity>

                                {/* Error Item */}
                                <TouchableOpacity
                                    onPress={() => {
                                        throw new Error("これはテスト用のエラーです");
                                    }}
                                    activeOpacity={0.7}
                                >
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
                                            <Typography
                                                variant="body"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                エラーを発生させる
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                                    </Card>
                                </TouchableOpacity>

                                {/* Maintenance Screen */}
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push("/maintenance");
                                    }}
                                    activeOpacity={0.7}
                                >
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
                                            <Typography
                                                variant="body"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                メンテナンス画面を表示
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                                    </Card>
                                </TouchableOpacity>

                                {/* Force update screen */}
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push("/force-update");
                                    }}
                                    activeOpacity={0.7}
                                >
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
                                            <Typography
                                                variant="body"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: "600",
                                                }}
                                            >
                                                強制アップデート画面を表示
                                            </Typography>
                                        </View>
                                        <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
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
                                {user?.studentId}
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
                                <Icon name="building" size={24} color={theme.colors.text.primary} />
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
                                <Icon name="calendar" size={24} color={theme.colors.text.primary} />
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
                                value={initTimetableViewMode}
                                onValueChange={(value) => setInitTimetableViewMode(value as "day" | "week")}
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

                    <TouchableOpacity onPress={handlePurgeCache} activeOpacity={0.7}>
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
                                <Icon name="trash-2" size={24} color={theme.colors.text.primary} />
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

                    <TouchableOpacity onPress={handleRefetchTimetable} activeOpacity={0.7}>
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
                                <Icon name="calendar" size={24} color={theme.colors.text.primary} />
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
                                        時間割更新
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        style={{
                                            color: theme.colors.text.secondary,
                                            fontSize: 14,
                                        }}
                                    >
                                        ポータルサイトから最新の時間割を取得する
                                    </Typography>
                                </View>
                            </View>
                            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Appearance Section */}
                {/* <View style={{ marginBottom: theme.spacing.xl }}>
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
                </View> */}

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
                        <TouchableOpacity onPress={handleFeedback} activeOpacity={0.7}>
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
                                    <Icon name="sticker" size={24} color={theme.colors.text.primary} />
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
                                            フィードバック
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            style={{
                                                color: theme.colors.text.secondary,
                                                fontSize: 14,
                                            }}
                                        >
                                            ご意見・ご要望をお聞かせください
                                        </Typography>
                                    </View>
                                </View>
                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleContact} activeOpacity={0.7}>
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
                                    <Icon name="message-circle-question-mark" size={24} color={theme.colors.text.primary} />
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
                                            問い合わせ
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            style={{
                                                color: theme.colors.text.secondary,
                                                fontSize: 14,
                                            }}
                                        >
                                            不明点などがあればこちらから
                                        </Typography>
                                    </View>
                                </View>
                                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
                            </Card>
                        </TouchableOpacity>

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
                                        Version {Application.nativeApplicationVersion ?? "unknown"}
                                    </Typography>
                                </View>
                            </View>
                        </Card>

                        <TouchableOpacity onPress={handleLicenseInfo} activeOpacity={0.7}>
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
