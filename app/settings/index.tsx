import { View, ScrollView, TouchableOpacity } from "react-native";
import { Typography, Card, Icon, useTheme } from "@/design-system";

export default function Settings() {
    const theme = useTheme();
    
    const settingsItems = [
        {
            id: 1,
            title: "プロフィール設定",
            description: "名前、学年、学校情報の変更",
            icon: "user" as const,
            onPress: () => {
                // TODO: プロフィール設定画面への遷移
            }
        },
        {
            id: 2,
            title: "通知設定",
            description: "課題の期限や時間割の通知設定",
            icon: "bell" as const,
            onPress: () => {
                // TODO: 通知設定画面への遷移
            }
        },
        {
            id: 3,
            title: "テーマ設定",
            description: "アプリの表示テーマを変更",
            icon: "palette" as const,
            onPress: () => {
                // TODO: テーマ設定画面への遷移
            }
        },
        {
            id: 4,
            title: "データのバックアップ",
            description: "課題や時間割データのバックアップ",
            icon: "cloud-upload" as const,
            onPress: () => {
                // TODO: バックアップ画面への遷移
            }
        },
        {
            id: 5,
            title: "アプリについて",
            description: "バージョン情報とサポート",
            icon: "info" as const,
            onPress: () => {
                // TODO: アプリ情報画面への遷移
            }
        },
        {
            id: 6,
            title: "ログアウト",
            description: "アカウントからログアウト",
            icon: "log-out" as const,
            isDestructive: true,
            onPress: () => {
                // TODO: ログアウト処理
            }
        }
    ];
    
    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: theme.colors.background.primary,
            padding: theme.spacing.md
        }}>
            <Typography 
                variant="h2" 
                style={{ 
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing.lg
                }}
            >
                設定
            </Typography>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {settingsItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        <Card style={{ 
                            marginBottom: theme.spacing.md,
                            borderLeftWidth: 4,
                            borderLeftColor: item.isDestructive 
                                ? theme.colors.status.error 
                                : theme.colors.primary.main
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: item.isDestructive 
                                        ? theme.colors.status.error + '20'
                                        : theme.colors.primary.main + '20',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: theme.spacing.md
                                }}>
                                    <Icon 
                                        name={item.icon}
                                        size={20}
                                        color={item.isDestructive 
                                            ? theme.colors.status.error 
                                            : theme.colors.primary.main}
                                    />
                                </View>
                                
                                <View style={{ flex: 1 }}>
                                    <Typography 
                                        variant="body" 
                                        style={{ 
                                            color: item.isDestructive 
                                                ? theme.colors.status.error 
                                                : theme.colors.text.primary 
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        style={{ 
                                            color: theme.colors.text.secondary,
                                            marginTop: theme.spacing.xs
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </View>
                                
                                <Icon 
                                    name="chevron-right"
                                    size={16}
                                    color={theme.colors.text.secondary}
                                />
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
                
                <View style={{ marginTop: theme.spacing.xl }}>
                    <Typography 
                        variant="caption" 
                        style={{ 
                            color: theme.colors.text.secondary,
                            textAlign: "center"
                        }}
                    >
                        PassPal v1.0.0
                    </Typography>
                </View>
            </ScrollView>
        </View>
    );
}
