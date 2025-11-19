import { useState } from "react";
import {
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { router } from "expo-router";

import { TRAIN_INFO_SERVICE, TrainInfoService, TrainInfoServiceName } from "@/src/domain/constants/bus";
import { Campus, CAMPUSES, campusNames } from "@/src/domain/constants/chukyo-univ";
import appServiceInstance from "@/src/domain/services/appService";
import authCoordinatorInstance from "@/src/domain/services/authCoordinator";
import { Button } from "@/src/presentation/components/Button";
import { Card } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon, IconName } from "@/src/presentation/components/Icon";
import { Input } from "@/src/presentation/components/Input";
import { Select } from "@/src/presentation/components/Select";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useAuth from "@/src/presentation/hooks/useAuth";
import useSetting from "@/src/presentation/hooks/useSetting";
import useTimetable from "@/src/presentation/hooks/useTimetable";
import { useToast } from "@/src/presentation/hooks/useToast";
import { PASSPAL_URLS } from "@/src/utils/urls";

export default function Settings() {
    const { theme } = useTheme();
    const toast = useToast();
    const { user } = useAuth();
    const {
        campus,
        setCampus,
        homeStation,
        setHomeStation,
        trainInfoService,
        setTrainInfoService,
        initTimetableViewMode,
        setInitTimetableViewMode,
    } = useSetting();
    const { refetch: refetchTimetable } = useTimetable();

    const [isStationModalOpen, setIsStationModalOpen] = useState(false);
    const [tempStationName, setTempStationName] = useState("");

    const isToyotaCampus = campus === "toyota";

    const handleLogout = async () => {
        await authCoordinatorInstance.signOut();
    };

    const handleSetHomeStation = () => {
        setTempStationName(homeStation || "");
        setIsStationModalOpen(true);
    };

    const handleSaveHomeStation = () => {
        setHomeStation(tempStationName.trim());
        setIsStationModalOpen(false);
        toast.success("最寄駅を設定しました");
    };

    const handleCancelStationModal = () => {
        setIsStationModalOpen(false);
        setTempStationName("");
    };

    const handlePurgeCache = () => {
        authCoordinatorInstance.purgeCaches();
        toast.success("キャッシュを削除しました");
    };

    const handleRefetchTimetable = async () => {
        toast.info("時間割の更新を開始しました");
        await refetchTimetable();
        toast.success("時間割を更新しました");
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
                                <SettingActionItem label="StoryBookを開く" onPress={() => router.push("/storybook")} />
                                <SettingActionItem
                                    label="トーストを表示"
                                    onPress={() => toast.success("これは成功のトーストです")}
                                />
                                <SettingActionItem
                                    label="エラーを発生させる"
                                    onPress={() => {
                                        throw new Error("これはテスト用のエラーです");
                                    }}
                                />
                                <SettingActionItem
                                    label="メンテナンス画面を表示"
                                    onPress={() => router.push("/maintenance")}
                                />
                                <SettingActionItem
                                    label="強制アップデート画面を表示"
                                    onPress={() => router.push("/force-update")}
                                />
                                <SettingActionItem label="デバッグ画面を開く" onPress={() => router.push("/debug")} />
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
                        <SettingActionItem
                            icon="log-out"
                            label="ログアウト"
                            onPress={handleLogout}
                            iconColor={theme.colors.status.error}
                            labelColor={theme.colors.status.error}
                        />
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

                    {/* キャンパス選択 */}
                    <SettingSelectItem
                        icon="building"
                        label="キャンパス選択"
                        value={campus}
                        onValueChange={(value) => setCampus(value as Campus)}
                        items={CAMPUSES.map((e) => ({ label: campusNames[e], value: e }))}
                    />

                    {/* 時間割表示 */}
                    <SettingSelectItem
                        icon="calendar"
                        label="時間割表示"
                        value={initTimetableViewMode}
                        onValueChange={(value) => setInitTimetableViewMode(value as "day" | "week")}
                        items={[
                            { label: "1日", value: "day" },
                            { label: "1週間", value: "week" },
                        ]}
                    />

                    {isToyotaCampus && (
                        <>
                            {/* 乗換案内サービスの選択 */}
                            <SettingSelectItem
                                icon="train"
                                label="使う乗換案内"
                                value={trainInfoService}
                                onValueChange={(value) => setTrainInfoService(value as TrainInfoService)}
                                items={TRAIN_INFO_SERVICE.map((e) => ({ label: TrainInfoServiceName[e], value: e }))}
                            />

                            {/* 最寄駅設定 */}
                            <SettingActionItem
                                icon="map-pin"
                                label={`最寄駅: ${homeStation ? homeStation : "未設定"}`}
                                description="最寄駅を変更・設定する"
                                onPress={handleSetHomeStation}
                            />
                        </>
                    )}
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

                    <SettingActionItem
                        icon="trash-2"
                        label="キャッシュ削除"
                        description="キャッシュされたデータを削除する"
                        onPress={handlePurgeCache}
                    />
                    <SettingActionItem
                        icon="calendar"
                        label="時間割更新"
                        description="ポータルサイトから最新の時間割を取得する"
                        onPress={handleRefetchTimetable}
                    />
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
                        <SettingActionItem
                            icon="sticker"
                            label="フィードバック"
                            description="ご意見・ご要望をお聞かせください"
                            onPress={handleFeedback}
                        />
                        <SettingActionItem
                            icon="message-circle-question-mark"
                            label="問い合わせ"
                            description="不明点などがあればこちらから"
                            onPress={handleContact}
                        />
                        <SettingActionItem
                            icon="info"
                            label="About PassPal"
                            description={appServiceInstance.versionInfo}
                            isTouchable={false}
                        />
                        <SettingActionItem label="ライセンス情報" onPress={handleLicenseInfo} />
                    </View>
                </View>
            </ScrollView>

            {/* 最寄駅入力モーダル */}
            <Modal
                visible={isStationModalOpen}
                transparent
                animationType="fade"
                onRequestClose={handleCancelStationModal}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={handleCancelStationModal}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: theme.spacing.lg,
                            }}
                        >
                            <TouchableWithoutFeedback>
                                <View
                                    style={{
                                        backgroundColor: theme.colors.background.primary,
                                        borderRadius: theme.spacing.borderRadius.lg,
                                        padding: theme.spacing.lg,
                                        width: "100%",
                                        maxWidth: 400,
                                        ...theme.components.shadows.large,
                                    }}
                                >
                                    {/* タイトルとクローズボタン */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: theme.spacing.md,
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            style={{
                                                color: theme.colors.text.primary,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            最寄駅を設定
                                        </Typography>
                                        <TouchableOpacity
                                            onPress={handleCancelStationModal}
                                            style={{
                                                padding: theme.spacing.xs,
                                            }}
                                        >
                                            <Typography
                                                variant="body"
                                                style={{
                                                    color: theme.colors.text.secondary,
                                                    fontSize: 24,
                                                    lineHeight: 24,
                                                }}
                                            >
                                                ×
                                            </Typography>
                                        </TouchableOpacity>
                                    </View>

                                    {/* 説明 */}
                                    <Typography
                                        variant="body"
                                        style={{
                                            color: theme.colors.text.secondary,
                                            fontSize: 14,
                                            marginBottom: theme.spacing.lg,
                                        }}
                                    >
                                        乗換案内で使用する最寄駅を入力してください
                                    </Typography>

                                    {/* 入力フィールド */}
                                    <Input
                                        value={tempStationName}
                                        onChangeText={setTempStationName}
                                        placeholder="例: 名古屋駅"
                                        autoFocus
                                        containerStyle={{ marginBottom: theme.spacing.lg }}
                                    />

                                    {/* ボタン */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: theme.spacing.sm,
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Button
                                                variant="secondary"
                                                onPress={handleCancelStationModal}
                                                style={{
                                                    height: 48,
                                                }}
                                            >
                                                キャンセル
                                            </Button>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Button
                                                variant="primary"
                                                onPress={handleSaveHomeStation}
                                                disabled={!tempStationName.trim()}
                                                style={{
                                                    height: 48,
                                                }}
                                            >
                                                保存
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

interface SettingSelectItemProps {
    icon: IconName;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    items: { label: string; value: string }[];
}

function SettingSelectItem({ icon, label, value, onValueChange, items }: SettingSelectItemProps) {
    const { theme } = useTheme();

    return (
        <Card
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: theme.spacing.md,
                height: 64,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name={icon} size={24} color={theme.colors.text.primary} />
                    <Typography
                        variant="body"
                        style={{
                            color: theme.colors.text.primary,
                            fontSize: 16,
                            fontWeight: "600",
                            marginLeft: theme.spacing.sm,
                        }}
                    >
                        {label}
                    </Typography>
                </View>
                <Select value={value} onValueChange={onValueChange} items={items} maxWidth={160} />
            </View>
        </Card>
    );
}

interface SettingActionItemProps {
    icon?: IconName;
    label: string;
    description?: string;
    onPress?: () => void;
    iconColor?: string;
    labelColor?: string;
    isTouchable?: boolean;
}

function SettingActionItem({
    icon,
    label,
    description,
    onPress,
    iconColor,
    labelColor,
    isTouchable = true,
}: SettingActionItemProps) {
    const { theme } = useTheme();

    const TouchableContainer = isTouchable ? TouchableOpacity : TouchableWithoutFeedback;

    return (
        <TouchableContainer onPress={onPress} activeOpacity={0.7}>
            <Card
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: theme.spacing.md,
                    height: description ? 72 : 56,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {icon && <Icon name={icon} size={24} color={iconColor || theme.colors.text.primary} />}
                    <View style={{ marginLeft: icon ? theme.spacing.sm : 0 }}>
                        <Typography
                            variant="body"
                            style={{
                                color: labelColor || theme.colors.text.primary,
                                fontSize: 16,
                                fontWeight: "600",
                                marginBottom: description ? theme.spacing.xs : 0,
                            }}
                        >
                            {label}
                        </Typography>
                        {description && (
                            <Typography
                                variant="caption"
                                style={{
                                    color: theme.colors.text.secondary,
                                    fontSize: 14,
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </View>
                </View>
                {isTouchable ? <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} /> : <View />}
            </Card>
        </TouchableContainer>
    );
}
