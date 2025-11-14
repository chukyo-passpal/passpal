# PassPal

> 中京大学学生向け統合学習支援アプリ

PassPalは、中京大学の各種システム（ALBO / MaNaBo / ポータル等）を横断し、学生の時間割・課題・バス・ニュース・メール・クラス情報を1画面で確認できるモバイルアプリケーションです。

[![App Store](https://img.shields.io/badge/App%20Store-Download-blue)](https://apps.apple.com/app/passpal/id6754452343)
[![Google Play](https://img.shields.io/badge/Google%20Play-Download-green)](https://play.google.com/store/apps/details?id=app.chukyopasspal.passpal)

## 📋 目次

- [技術スタック](#-技術スタック)
- [プロジェクト構成](#-プロジェクト構成)
- [アーキテクチャ](#-アーキテクチャ)
- [セットアップ](#-セットアップ)
- [開発](#-開発)
- [ビルドとデプロイ](#-ビルドとデプロイ)
- [コーディング規約](#-コーディング規約)
- [トラブルシューティング](#-トラブルシューティング)

## 🚀 技術スタック

### コアテクノロジー
- **React Native** 0.81.5 + **React** 19.1.0
- **Expo SDK** 54 + **Expo Router** 6 (ファイルベースルーティング)
- **TypeScript** 5.9 (strict モード)

### UI/UX
- **Tamagui** 1.135 (クロスプラットフォーム UI フレームワーク)
- **Lucide React Native** (アイコンライブラリ)
- **React Native Reanimated** 4 (アニメーション)
- **React Native Gesture Handler** 2 (ジェスチャー処理)

### 状態管理・データ取得
- **Zustand** 5 + **Immer** 10 (グローバル状態管理)
- **Zod** 4 (バリデーション)
- **@chukyo-passpal/web_parser** (大学システムのHTML解析)

### Firebase統合
- **Firebase Analytics** (利用状況分析)
- **Firebase Auth** (認証)
- **Firebase Remote Config** (リモート設定)
- **Firebase Messaging** (プッシュ通知)
- **Google Sign-In** (ソーシャルログイン)

### 開発ツール
- **ESLint** 9 + **Prettier** 3 (コード品質)
- **Storybook** 9 (コンポーネントカタログ)
- **Bun** (パッケージマネージャー・タスクランナー)
- **EAS** (Expo Application Services - ビルド・配信)

## 📁 プロジェクト構成

```
passpal/
├── app/                      # Expo Router ベースの画面定義
│   ├── (tabs)/              # タブナビゲーション
│   │   ├── index.tsx        # ホーム画面
│   │   ├── timetable.tsx    # 時間割
│   │   ├── assignments.tsx  # 課題一覧
│   │   └── bus.tsx          # バス時刻表
│   ├── login/               # ログイン画面
│   ├── setup/               # 初期設定画面
│   ├── settings/            # 設定画面
│   ├── class/[classId]/     # クラス詳細（動的ルート）
│   ├── debug/               # デバッグ用画面
│   └── _layout.tsx          # ルートレイアウト
│
├── src/
│   ├── presentation/        # UI層（コンポーネント、hooks、tokens）
│   ├── domain/              # ドメイン層（usecases、services、models）
│   └── data/                # データ層（repositories、providers、mappers）
│
├── assets/                  # 画像、アイコン、静的データ
├── ios/                     # iOSネイティブコード
├── scripts/                 # ビルドスクリプト
│
├── app.json                 # Expoアプリ設定
├── eas.json                 # EASビルド設定
├── firebase.json            # Firebase設定
├── tamagui.config.ts        # Tamagui設定
└── package.json             # 依存関係とスクリプト
```

## 🏗️ アーキテクチャ

PassPalは **Clean Architecture** を採用し、レイヤー間の依存関係を厳密に管理しています。

```
┌─────────────────────────────────────────────┐
│  UI Layer (app/, src/presentation/)         │
│  - 画面、コンポーネント、カスタムフック      │
│  - Zustand読み取り、Serviceのみ呼び出し     │
└────────────────┬────────────────────────────┘
                 │ 依存
                 ↓
┌─────────────────────────────────────────────┐
│  Domain Layer (src/domain/)                 │
│  - Usecases（1目的1関数）                   │
│  - Services（複数Usecase + 状態更新）       │
│  - Models、Constants、Errors                │
└────────────────┬────────────────────────────┘
                 │ 依存
                 ↓
┌─────────────────────────────────────────────┐
│  Data Layer (src/data/)                     │
│  - Repositories（データソース統合）          │
│  - Providers（HTTP/HTML/Cache/Firebase）    │
│  - Mappers（型変換・バリデーション）         │
│  - Clients（通信・認証処理）                 │
└─────────────────────────────────────────────┘
```

### レイヤー責務

#### UI層
- **役割**: レンダリングとユーザー入力のみ
- **禁止事項**: ビジネスロジック、直接のAPI呼び出し、Zustand直接更新
- **実装**: Expo Routerで画面定義、カスタムフックで状態とサービス利用

#### Domain層
- **役割**: ビジネスルールとユースケース
- **Usecase**: 1目的をRepository interfaceのみで実装
- **Service**: 複数Usecaseの組み合わせ + Zustand更新
- **禁止事項**: 実装詳細への依存（Provider、HTTP詳細など）

#### Data層
- **役割**: 外部IO、データ変換、キャッシング
- **Repository**: Provider + Mapperの統合ポイント
- **Provider**: データソース別実装（大学システム、Firebase、APIなど）
- **Mapper**: 生データ → ドメインモデル変換 + バリデーション

## 🛠️ セットアップ

### 前提条件

- **Node.js** 18以上
- **Bun** (推奨) または npm/yarn
- **Xcode** (iOS開発)
- **Android Studio** (Android開発)
- **Expo CLI** (`bun install -g expo-cli`)

https://qiita.com/dokimiki/items/9f5550948ad5667b990c

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/chukyo-passpal/passpal.git
cd passpal

# 依存関係のインストール
bun install
```

## 💻 開発

### 開発サーバーの起動

```bash
# Expo Dev Serverの起動
bun run start

# iOSシミュレータで起動
bun run ios

# Androidエミュレータで起動
bun run android
```

### コード品質チェック

```bash
# Prettierでフォーマット（import順も自動整理）
bun run format

# ESLintでコード検証
bun run lint

# TypeScript型チェック
bun tsc --noEmit
```

**重要**: プルリクエスト前に必ず上記3つのコマンドを実行し、すべてパスすることを確認してください。

### Storybookの利用

```bash
# Storybookストーリーの生成
bun run storybook-generate

# アプリ内でStorybook表示
# app/storybook.tsxにアクセス
```

コンポーネント追加・変更時は必ず `*.stories.tsx` を作成し、`bun run storybook-generate` を実行してください。

### デバッグ画面

開発中は `app/debug/` の画面群を活用できます：
- `/debug` - デバッグメニュー
- `/debug/zustand` - Zustand状態の可視化
- `/debug/update` - アップデート機能のテスト

## 📦 ビルドとデプロイ

### ローカルビルド

```bash
# 開発用ビルド
bun run build:ios      # iOS
bun run build:android  # Android
```

### 本番リリース (EAS使用)

```bash
# iOS Production Build + App Store Submit
bun run submit:ios

# Android Production Build + Google Play Submit
bun run submit:android
```

**注意**:
- EAS CLIがインストールされている必要があります (`bun install -g eas-cli`)
- EASプロジェクトへのアクセス権限が必要です (Owner: passpal)
- 本番ビルドは自動的にバージョン番号がインクリメントされます (`eas.json`の`autoIncrement`設定)

### Expo Updates (OTA)

Runtime Versionが同じであれば、JavaScriptバンドルのみの更新がWiFi接続時に自動配信されます。

```bash
# 本番用OTAアップデートの公開
eas update
```

## 📝 コーディング規約

### レイヤー依存ルール

**厳守事項**: `UI → Domain → Data` の一方向依存

```typescript
// ✅ 良い例
// UI層: Serviceを呼び出し
const { login } = useAuthService();
await login(email, password);

// ❌ 悪い例
// UI層で直接Repositoryを呼び出し
const user = await authRepository.login(email, password); // NG!
```

### カスタムフック設計

```typescript
// src/presentation/hooks/useExample.ts
export const useExample = () => {
  const state = useExampleStore();
  const { doSomething } = useExampleService();

  const handleAction = useCallback(async () => {
    // ビジネスロジックはServiceに委譲
    await doSomething();
  }, [doSomething]);

  return { state, handleAction };
};
```

**ルール**:
- フック内にビジネスロジックを書かない
- Zustand読み取りとService呼び出しのみ
- ハンドラは `useCallback` でメモ化

### Service設計

```typescript
// src/domain/services/ExampleService.ts
export class ExampleService {
  constructor(
    private repo: ExampleRepository,
    private store: ExampleStore
  ) {}

  async fetchAndUpdate() {
    // 1. Usecaseで取得
    const data = await this.fetchDataUsecase.execute();
    
    // 2. バリデーション
    if (!isValid(data)) throw new ServiceError();
    
    // 3. 状態更新
    this.store.setState({ data });
  }
}
```

**ルール**:
- Usecaseの組み合わせ + 状態更新
- UIから呼ばれる唯一のエントリーポイント
- Repository interfaceのみに依存

### コンポーネント設計

```typescript
// src/presentation/components/atoms/Button.tsx
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ label, onPress, variant }) => {
  // Pure component: propsとcallbackのみで描画
  return (
    <TamaguiButton onPress={onPress} variant={variant}>
      {label}
    </TamaguiButton>
  );
};
```

**ルール**:
- Pure componentを目指す（副作用なし）
- 主要コンポーネントには `*.stories.tsx` を作成
- Storybookで全パターンを可視化

### エラーハンドリング

```typescript
// Data層でドメインエラーに変換
try {
  const response = await httpClient.get('/api/data');
  return mapper.toModel(response);
} catch (error) {
  if (error instanceof NetworkError) {
    throw new ServiceError('ネットワークエラー');
  }
  throw new ServiceError('予期しないエラー');
}

// UI層でキャッチして表示
try {
  await service.fetchData();
} catch (error) {
  if (error instanceof ServiceError) {
    showToast(error.message);
  }
}
```

### 型安全性

```typescript
// ❌ anyを避ける
const data: any = await fetch();

// ✅ Zodでバリデーション
const DataSchema = z.object({
  id: z.string(),
  name: z.string(),
});
const data = DataSchema.parse(rawData);
```

## 🐛 トラブルシューティング

### キャッシュクリア

```bash
expo start -c
# または
bun run start -- --clear
```


### Expo診断

```bash
bun x expo-doctor
```

## 📄 ライセンス管理

依存パッケージのライセンス情報を管理：

```bash
# ライセンス情報の更新
bun run license:update

# ライセンスサマリー表示
bun run license:summary
```

生成されたライセンス情報は `assets/data/licenseEntries.json` に保存され、アプリ内の `/license` 画面で表示されます。

## 🔗 リンク

- 公式サイト: https://chukyo-passpal.app
- **GitHub**: https://github.com/chukyo-passpal/passpal
- **App Store**: https://apps.apple.com/app/passpal/id6754452343
- **Google Play**: https://play.google.com/store/apps/details?id=app.chukyopasspal.passpal
- **EAS Project**: https://expo.dev/accounts/passpal/projects/passpal

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット前に品質チェック (`bun run format && bun run lint && bun tsc --noEmit`)
4. 変更をコミット (`git commit -m 'Add amazing feature'`)
5. ブランチにプッシュ (`git push origin feature/amazing-feature`)
6. プルリクエストを作成

### コミットメッセージ規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント変更のみ
style: コードフォーマット（機能変更なし）
refactor: リファクタリング
test: テスト追加・修正
chore: ビルド・補助ツール変更
```

---

**Made with ❤️ by PassPal Project**
