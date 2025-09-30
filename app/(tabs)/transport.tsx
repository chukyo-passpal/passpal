import { View, ScrollView } from "react-native";
import { Typography, Card, Button, Icon, useTheme } from "@/design-system";

export default function Transport() {
    const theme = useTheme();
    
    // サンプルの交通情報データ
    const transportRoutes = [
        {
            id: 1,
            name: "最短ルート",
            duration: "45分",
            cost: "320円",
            transfers: 1,
            steps: [
                { type: "walk", description: "自宅から駅まで徒歩", duration: "8分" },
                { type: "train", description: "JR線", duration: "25分", cost: "200円" },
                { type: "train", description: "地下鉄", duration: "7分", cost: "120円" },
                { type: "walk", description: "駅から学校まで徒歩", duration: "5分" },
            ]
        },
        {
            id: 2,
            name: "最安ルート",
            duration: "55分",
            cost: "280円",
            transfers: 2,
            steps: [
                { type: "walk", description: "自宅からバス停まで徒歩", duration: "5分" },
                { type: "bus", description: "市バス", duration: "20分", cost: "180円" },
                { type: "train", description: "私鉄", duration: "25分", cost: "100円" },
                { type: "walk", description: "駅から学校まで徒歩", duration: "5分" },
            ]
        }
    ];
    
    const getTransportIcon = (type: string) => {
        switch (type) {
            case "train":
                return "train";
            case "bus":
                return "bus";
            case "walk":
                return "footprints";
            default:
                return "map-pin";
        }
    };
    
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
                通学ルート
            </Typography>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {transportRoutes.map((route) => (
                    <Card key={route.id} style={{ marginBottom: theme.spacing.md }}>
                        <View style={{ marginBottom: theme.spacing.md }}>
                            <Typography 
                                variant="h3" 
                                style={{ color: theme.colors.text.primary }}
                            >
                                {route.name}
                            </Typography>
                            
                            <View style={{ 
                                flexDirection: "row", 
                                justifyContent: "space-between",
                                marginTop: theme.spacing.sm
                            }}>
                                <View style={{ flex: 1 }}>
                                    <Typography 
                                        variant="bodySmall" 
                                        style={{ color: theme.colors.text.secondary }}
                                    >
                                        所要時間: {route.duration}
                                    </Typography>
                                    <Typography 
                                        variant="bodySmall" 
                                        style={{ color: theme.colors.text.secondary }}
                                    >
                                        運賃: {route.cost}
                                    </Typography>
                                    <Typography 
                                        variant="bodySmall" 
                                        style={{ color: theme.colors.text.secondary }}
                                    >
                                        乗り換え: {route.transfers}回
                                    </Typography>
                                </View>
                                
                                <Button 
                                    variant="secondary" 
                                    size="small"
                                    onPress={() => {
                                        // TODO: ルート詳細を表示
                                    }}
                                >
                                    詳細
                                </Button>
                            </View>
                        </View>
                        
                        <View style={{ marginTop: theme.spacing.md }}>
                            <Typography 
                                variant="label" 
                                style={{ 
                                    color: theme.colors.text.primary,
                                    marginBottom: theme.spacing.sm
                                }}
                            >
                                ルート詳細
                            </Typography>
                            
                            {route.steps.map((step, index) => (
                                <View 
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: theme.spacing.xs,
                                    }}
                                >
                                    <Icon 
                                        name={getTransportIcon(step.type) as any}
                                        size={16}
                                        color={theme.colors.primary.main}
                                    />
                                    <View style={{ marginLeft: theme.spacing.sm, flex: 1 }}>
                                        <Typography 
                                            variant="bodySmall" 
                                            style={{ color: theme.colors.text.primary }}
                                        >
                                            {step.description}
                                        </Typography>
                                        {step.cost && (
                                            <Typography 
                                                variant="caption" 
                                                style={{ color: theme.colors.text.secondary }}
                                            >
                                                {step.cost}
                                            </Typography>
                                        )}
                                    </View>
                                    <Typography 
                                        variant="caption" 
                                        style={{ 
                                            color: theme.colors.text.secondary,
                                            textAlign: "right"
                                        }}
                                    >
                                        {step.duration}
                                    </Typography>
                                </View>
                            ))}
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}
