import { Campus } from "@/constants/chukyo-univ";
import useSetting from "@/hooks/useSetting";
import { router } from "expo-router";
import { Car, Check, GraduationCap } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { BodyText, Card, Heading2, PrimaryButton, useTheme } from "../../design-system";

export default function Index() {
    const { theme } = useTheme();
    const { setCampus } = useSetting();
    const [selectedCampus, setSelectedCampus] = useState<Campus>("nagoya");

    const handleNext = () => {
        setCampus(selectedCampus);
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
                    <View style={{ gap: 8, marginBottom: 24 }}>
                        <Heading2 style={{ textAlign: "center" }}>どちらのキャンパスに在籍していますか？</Heading2>
                        <BodyText style={{ color: theme.colors.text.secondary, textAlign: "center" }}>
                            あなたにぴったりの体験をお届けするために役立ちます。
                        </BodyText>
                    </View>
                    {/* Campus Options */}
                    <View style={{ width: "100%", gap: 16, marginBottom: 32 }}>
                        {/* Nagoya Campus */}
                        <Pressable onPress={() => setSelectedCampus("nagoya")}>
                            <Card
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 2,
                                    borderColor: selectedCampus === "nagoya" ? theme.colors.primary.main : "transparent",
                                    backgroundColor: selectedCampus === "nagoya" ? theme.colors.background.secondary : theme.colors.background.primary,
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
                                {selectedCampus === "nagoya" && (
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
                                )}
                            </Card>
                        </Pressable>
                        {/* Toyota Campus */}
                        <Pressable onPress={() => setSelectedCampus("toyota")}>
                            <Card
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 2,
                                    borderColor: selectedCampus === "toyota" ? theme.colors.primary.main : "transparent",
                                    backgroundColor: selectedCampus === "toyota" ? theme.colors.background.secondary : theme.colors.background.primary,
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
                                {selectedCampus === "toyota" && (
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
                                )}
                            </Card>
                        </Pressable>
                    </View>
                    {/* Next Button */}
                    <PrimaryButton onPress={handleNext}>次へ</PrimaryButton>
                </Card>
            </ScrollView>
        </View>
    );
}
