# PassPal Design System

PassPal のデザインシステムは、一貫性のあるユーザーエクスペリエンスを提供するために構築されました。このドキュメントでは、デザインシステムの使用方法について説明します。

## セットアップ

### 1. ThemeProvider の設定

アプリケーションのルートで `ThemeProvider` を設定してください：

```tsx
import { ThemeProvider } from './design-system';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. コンポーネントの使用

```tsx
import { Typography, Button, Card } from './design-system';

function ExampleScreen() {
  return (
    <View>
      <Typography variant="h1">ようこそ PassPalへ！</Typography>
      <Button variant="primary" size="large">
        サインイン
      </Button>
    </View>
  );
}
```

## デザイントークン

### カラーシステム

- **Primary Colors**: メインブランドカラー
  - `#B19CD9` - Primary
  - `#F0EBFF` - Primary Light
  - `#8B7BB8` - Primary Dark

- **Status Colors**: ステータス表示用
  - `#90C695` - Success
  - `#F5C842` - Warning
  - `#E57373` - Error
  - `#81C7D4` - Info

- **Neutral Colors**: テキストと背景
  - `#2D2D30` - Black
  - `#8B8B8B` - Gray 600
  - `#B8B8B8` - Gray 400
  - `#E8E8E8` - Gray 200
  - `#FFFFFF` - White

### タイポグラフィ

Inter フォントファミリーを使用：

- **H1**: 32px, Bold (見出し1)
- **H2**: 24px, Bold (見出し2)
- **H3**: 20px, Bold (見出し3)
- **Body**: 16px, Regular (本文)
- **Body Small**: 14px, Regular (小さい本文)

### スペーシング

8px ベースのスペーシングシステム：

- **8px**: 小スペース（関連要素間）
- **16px**: 標準スペース（パディング）
- **24px**: 大きなスペース（カード間）
- **32px**: 特大スペース（メインセクション間）

## コンポーネント

### Button

```tsx
// Primary Button
<Button variant="primary" size="large">
  サインイン（学内Googleアカウント）
</Button>

// Secondary Button
<Button variant="secondary" size="medium">
  また後で
</Button>

// Text Button
<Button variant="text">
  学籍番号入力に戻る
</Button>
```

### IconButton

```tsx
// Default Icon Button (戻るボタンなど)
<IconButton 
  icon="chevron-left" 
  variant="default" 
  size="medium"
  onPress={handleBack}
/>

// Primary Icon Button (確認アクションなど)
<IconButton 
  icon="check" 
  variant="primary"
  onPress={handleConfirm}
/>

// Ghost Icon Button (控えめなアクション)
<IconButton 
  icon="settings" 
  variant="ghost"
/>

// サイズバリエーション
<IconButton icon="home" size="small" />   // 28px
<IconButton icon="home" size="medium" />  // 34px (デフォルト)
<IconButton icon="home" size="large" />   // 44px

// 便利な短縮形コンポーネント
<DefaultIconButton icon="chevron-left" />
<PrimaryIconButton icon="check" />
<GhostIconButton icon="settings" />
```

### Input

```tsx
// Basic Input
<Input 
  placeholder="学生番号"
  leftIcon={<UserIcon size={20} />}
/>

// Password Input
<Input 
  placeholder="パスワード"
  isPassword
/>
```

### Card

```tsx
// Info Card
<InfoCard
  title="次の授業"
  content="アルゴリズムとデータ構造 1273"
  icon={<CalendarIcon size={20} />}
/>

// Feature Card
<FeatureCard
  title="時間割・出欠管理"
  description="授業の時間割をひと目で確認。スムーズに一日をスタートできます。"
  icon={<CalendarIcon size={24} />}
/>
```

### Navigation

```tsx
// Tab Navigation
<TabNavigation
  tabs={[
    { id: 'day', label: '1日', active: true },
    { id: 'week', label: '1週間', active: false },
  ]}
  onTabPress={(tabId) => console.log(tabId)}
/>

// Bottom Navigation
<BottomNavigation
  items={[
    { id: 'home', label: 'ホーム', icon: 'home', active: true },
    { id: 'timetable', label: '時間割', icon: 'calendar' },
    { id: 'assignments', label: '課題', icon: 'clipboard-list' },
    { id: 'transport', label: '時刻表', icon: 'bus' },
  ]}
  onItemPress={(itemId) => console.log(itemId)}
/>
```

### Typography

```tsx
<Typography variant="h1" color="#B19CD9">
  ようこそ PassPalへ！
</Typography>

<Typography variant="body">
  新しいキャンパスライフ・アシスタント
</Typography>

// 便利な短縮形コンポーネント
<Heading1>見出し1</Heading1>
<BodyText>本文テキスト</BodyText>
```

### Icon

```tsx
// Basic Icon
<Icon name="home" size={24} />

// Icon with Container
<IconContainer 
  name="calendar" 
  size={24} 
  variant="primary" 
/>

// Specific Icon Components
<HomeIcon size={20} />
<CalendarIcon size={24} />
<UserIcon size={16} />
```

## テーマのカスタマイズ

```tsx
import { ThemeProvider, theme } from './design-system';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      main: '#YOUR_CUSTOM_COLOR',
    },
  },
};

export default function App() {
  return (
    <ThemeProvider customTheme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## テーマフックの使用

```tsx
import { useTheme } from './design-system';

function CustomComponent() {
  const theme = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.primary.main,
      padding: theme.spacing.md,
      borderRadius: theme.spacing.borderRadius.md,
    }}>
      {/* Component content */}
    </View>
  );
}
```

## デザイン原則

1. **一貫性**: すべてのコンポーネントで統一されたカラーパレットを使用
2. **アクセシビリティ**: 十分なコントラスト比を確保し、読みやすさを重視
3. **スケーラビリティ**: 8pxベースのスペーシングで整然としたレイアウト
4. **ユーザビリティ**: 直感的で使いやすいインターフェース設計
