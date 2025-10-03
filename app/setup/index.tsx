import { ScrollView, View } from "react-native";
import { BodyText, PrimaryButton, Card, useTheme, Heading2 } from "../../design-system";
import { Car, Check, GraduationCap } from "lucide-react-native";
import { router } from "expo-router";

export default function Index() {
    const { theme } = useTheme();

    const handleNext = () => {
        router.push("/setup/step2");
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg }}>
            <ScrollView
                contentContainerStyle={{ justifyContent: "center", flex: 1, maxWidth: 400, alignSelf: "center", width: "100%" }}
                showsVerticalScrollIndicator={false}
            >
                {/* Main Card Section */}
                <Card style={{ padding: 24 }}>
                    <View style={{ flex: 1, gap: 8, marginBottom: 24 }}>
                        <Heading2 style={{ textAlign: "center" }}>どちらのキャンパスに在籍していますか？</Heading2>
                        <BodyText style={{ color: theme.colors.text.secondary, textAlign: "center" }}>
                            あなたにぴったりの体験をお届けするために役立ちます。
                        </BodyText>
                    </View>
                    {/* Campus Options */}
                    <View style={{ width: "100%", gap: 16, marginBottom: 32 }}>
                        {/* Nagoya Campus */}
                        <Card
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.main,
                                    borderRadius: 8,
                                    width: 40,
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 16,
                                }}
                            >
                                <GraduationCap size={24} color={theme.colors.text.inverse} />
                            </View>
                            <BodyText style={{ fontWeight: "600", fontSize: 18, flex: 1 }}>名古屋キャンパス</BodyText>
                        </Card>
                        {/* Toyota Campus (Selected) */}
                        <Card
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 2,
                                borderColor: theme.colors.primary.main,
                                backgroundColor: theme.colors.background.secondary,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.main,
                                    borderRadius: 8,
                                    width: 40,
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 16,
                                }}
                            >
                                <Car size={24} color={theme.colors.text.inverse} />
                            </View>
                            <BodyText style={{ fontWeight: "600", fontSize: 18, flex: 1 }}>豊田キャンパス</BodyText>
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary.main,
                                    borderRadius: 12,
                                    width: 24,
                                    height: 24,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: 8,
                                }}
                            >
                                <Check size={16} color={theme.colors.text.inverse} />
                            </View>
                        </Card>
                    </View>
                    {/* Next Button */}
                    <PrimaryButton onPress={handleNext}>次へ</PrimaryButton>
                </Card>
            </ScrollView>
        </View>
    );
}
