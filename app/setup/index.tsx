import { View } from "react-native";
import { Heading1, BodyText, PrimaryButton, Card } from "../../design-system";
import { Car, Check, GraduationCap, Icon } from "lucide-react-native";

export default function Index() {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 80, alignItems: "center" }}>
            {/* Progress Bar Section */}
            <View style={{ width: 338, height: 40, alignItems: "center", marginBottom: 24 }}>
                <View style={{ width: 338, height: 12, backgroundColor: "#e8e8e8", borderRadius: 100, overflow: "hidden" }}>
                    <View style={{ width: 112, height: 12, backgroundColor: "#b19cd9", borderRadius: 100 }} />
                </View>
                <BodyText style={{ color: "#b19cd9", fontWeight: "600", fontSize: 18, marginTop: 8, textAlign: "center" }}>キャンパス選択 1/3</BodyText>
            </View>
            {/* Main Card Section */}
            <Card style={{ width: 338, padding: 24, alignItems: "center", backgroundColor: "#fff" }}>
                <Heading1 style={{ color: "#2d2d30", fontSize: 24, marginBottom: 8, textAlign: "center" }}>どちらのキャンパスに在籍していますか？</Heading1>
                <BodyText style={{ color: "#8b8b8b", fontSize: 16, marginBottom: 24, textAlign: "center" }}>
                    あなたにぴったりの体験をお届けするために役立ちます。
                </BodyText>
                {/* Campus Options */}
                <View style={{ width: "100%", gap: 16 }}>
                    {/* Nagoya Campus */}
                    <Card
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 20,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: "#e8e8e8",
                            marginBottom: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#b19cd9",
                                borderRadius: 8,
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 16,
                            }}
                        >
                            <GraduationCap size={24} color="#fff" />
                        </View>
                        <BodyText style={{ color: "#2d2d30", fontWeight: "600", fontSize: 18 }}>名古屋キャンパス</BodyText>
                    </Card>
                    {/* Toyota Campus (Selected) */}
                    <Card
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 20,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: "#b19cd9",
                            backgroundColor: "#f0ebff",
                            marginBottom: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#b19cd9",
                                borderRadius: 8,
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 16,
                            }}
                        >
                            <Car size={24} color="#fff" />
                        </View>
                        <BodyText style={{ color: "#2d2d30", fontWeight: "600", fontSize: 18, flex: 1 }}>豊田キャンパス</BodyText>
                        <View
                            style={{
                                backgroundColor: "#b19cd9",
                                borderRadius: 12,
                                width: 24,
                                height: 24,
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 8,
                            }}
                        >
                            <Check size={16} color="#fff" />
                        </View>
                    </Card>
                </View>
                {/* Next Button */}
                <PrimaryButton
                    style={{
                        marginTop: 32,
                        width: "100%",
                        borderRadius: 28,
                        height: 56,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#b19cd9",
                    }}
                >
                    <BodyText style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>次へ</BodyText>
                </PrimaryButton>
            </Card>
        </View>
    );
}
