import { AlboNewsInfo } from "@/src/domain/models/news";
import { Button } from "@/src/presentation/components/Button";
import { Card, CardDivider, CardHeader } from "@/src/presentation/components/Card";
import Header from "@/src/presentation/components/Header";
import { Icon } from "@/src/presentation/components/Icon";
import { StatCard } from "@/src/presentation/components/StatCard";
import { Typography } from "@/src/presentation/components/Typography";
import { useTheme } from "@/src/presentation/hooks/ThemeProvider";
import useMail from "@/src/presentation/hooks/useMail";
import useNews from "@/src/presentation/hooks/useNews";
import { ALBO_URLS, MANABO_URLS } from "@/src/utils/urls";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, ScrollView, View } from "react-native";

export default function HomeScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const { newsData, refetch: refetchNews, loading: loadingNews, lastFetch: newsLastFetch } = useNews();
    const { mailData, refetch: refetchMail, loading: mailLoading, lastFetch: mailLastFetch } = useMail();

    const handleOpenALBO = () => {
        Linking.openURL(ALBO_URLS.login);
    };

    const handleOpenMaNaBo = () => {
        Linking.openURL(MANABO_URLS.auth);
    };

    const handleOpenSettings = () => {
        router.push("/settings");
    };

    // メールの最終取得日が12時間以上前 | null && ローディング中でない場合は再取得
    React.useEffect(() => {
        if (mailLoading) return;
        const now = new Date();
        if (!mailLastFetch || now.getTime() - mailLastFetch.getTime() > 12 * 60 * 60 * 1000) {
            refetchMail();
        }
    }, [mailLastFetch, mailLoading, refetchMail]);

    // ニュースの最終取得日が12時間以上前 | null && ローディング中でない場合は再取得
    React.useEffect(() => {
        if (loadingNews) return;
        const now = new Date();
        if (!newsLastFetch || now.getTime() - newsLastFetch.getTime() > 12 * 60 * 60 * 1000) {
            refetchNews();
        }
    }, [newsLastFetch, loadingNews, refetchNews]);

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

                {__DEV__ && (
                    <>
                        <Button
                            variant="text"
                            onPress={() => {
                                refetchNews();
                            }}
                        >
                            refetch news
                        </Button>
                        <Button
                            variant="text"
                            onPress={() => {
                                refetchMail();
                            }}
                        >
                            refetch mail
                        </Button>
                    </>
                )}

                {/* Info Cards Row */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.lg,

                        // TODO: 機能が完成したら表示
                        height: 0,
                        opacity: 0,
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
                        {loadingNews ? (
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center" }}>
                                読み込み中...
                            </Typography>
                        ) : newsData?.alboNews && newsData.alboNews.length > 0 ? (
                            newsData.alboNews.map((news, index) => <AlboNewsComponent key={index} newsItem={news} />).slice(0, 3)
                        ) : (
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center" }}>
                                現在お知らせはないです。
                            </Typography>
                        )}
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
                        {mailLoading ? (
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center" }}>
                                読み込み中...
                            </Typography>
                        ) : mailData?.manaboMails && mailData.manaboMails.length > 0 ? (
                            mailData.manaboMails.slice(0, 3).map((mail, index) => (
                                <MailComponent
                                    key={index}
                                    mailItem={{
                                        title: mail.title,
                                        author: mail.author,
                                        date: new Date(mail.receivedAt).toLocaleDateString("ja-JP", {
                                            month: "short",
                                            day: "numeric",
                                        }),
                                        isRead: mail.isRead,
                                    }}
                                />
                            ))
                        ) : (
                            <Typography variant="body" color={theme.colors.text.secondary} style={{ textAlign: "center", flex: 1 }}>
                                現在新しいメールはないです。
                            </Typography>
                        )}
                    </View>
                </Card>

                {/* Manabo News Card */}
                {/* <Card
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
                </Card> */}

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

const AlboNewsComponent = ({ newsItem }: { newsItem: AlboNewsInfo }) => {
    const { theme } = useTheme();

    return (
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1, gap: 8 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {newsItem.isImportant && (
                        <View
                            style={{
                                backgroundColor: theme.colors.status.error + "20",
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 4,
                                height: 24,
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="caption" color={theme.colors.status.error} style={{ fontWeight: "600" }}>
                                重要
                            </Typography>
                        </View>
                    )}
                    <Typography variant="body" color={theme.colors.text.primary} style={{ flex: 1, fontWeight: "500" }}>
                        {newsItem.title}
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
                            {newsItem.category}
                        </Typography>
                    </View>
                </View>
            </View>
        </View>
    );
};

const MailComponent = ({ mailItem }: { mailItem: { title: string; author: string; date: string; isRead: boolean } }) => {
    const { theme } = useTheme();

    return (
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <View style={{ flex: 1, gap: 8 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {!mailItem.isRead && (
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: theme.colors.primary.main,
                            }}
                        />
                    )}
                    <Typography variant="body" color={theme.colors.text.primary} style={{ flex: 1, fontWeight: !mailItem.isRead ? "600" : "500" }}>
                        {mailItem.title}
                    </Typography>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="caption" color={theme.colors.text.secondary}>
                        {mailItem.author}
                    </Typography>
                    <Typography variant="caption" color={theme.colors.text.secondary}>
                        {mailItem.date}
                    </Typography>
                </View>
            </View>
        </View>
    );
};
