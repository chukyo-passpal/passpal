# PassPal

> 中京大学学生向け統合学習支援アプリ

PassPalは、中京大学の各種システム（ALBO / MaNaBo / ポータル等）を横断し、学生の時間割・課題・バス・ニュース・メール・クラス情報を1画面で確認できるモバイルアプリケーションです。

[![App Store](https://img.shields.io/badge/App%20Store-Download-blue)](https://apps.apple.com/app/passpal/id6754452343)
[![Google Play](https://img.shields.io/badge/Google%20Play-Download-green)](https://play.google.com/store/apps/details?id=app.chukyopasspal.passpal)

## 🛠️ セットアップ

### 前提条件

- **Node.js** 24(LTS) [公式サイト](https://nodejs.org/ja/download)
- **Bun** [公式サイト](https://bun.sh/)
- **Xcode** (iOS開発)
- **Android Studio** (Android開発)
- **Expo CLI** (`npm install -g expo-cli`)
- **Github アカウント** [公式サイト](https://github.com/)
- **Expo アカウント** [公式サイト](https://expo.dev/)

#### 参考記事
[macOSのローカル上でExpoをbuildできるようになるまで](https://qiita.com/dokimiki/items/5273b50a4eacd2ce2fa1)
[まっさらなUbuntu 24.04 wsl上にExpoのローカルビルド環境を作るメモ](https://qiita.com/dokimiki/items/9f5550948ad5667b990c)

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/chukyo-passpal/passpal.git
cd passpal

# 依存関係のインストール
bun install
bun run storybook-generate
# スタートと同時にexpo-env.d.tsを生成する
bun run start
```

### iosでウィジェットを動かす場合

```bash
bun expo prebuild -p ios --clean
xed ios
```

## 🎨 ウィジェット機能

PassPalは、iOS・Androidの両方でホーム画面ウィジェット機能を提供しています。

### 構成

#### iOS ウィジェット
- **ネイティブコード**: `/targets/widget/` にSwiftで実装
  - `widgets.swift`: メインウィジェット実装（TimelineProvider使用）
  - `WidgetControl.swift`: コントロールウィジェット
  - `WidgetLiveActivity.swift`: Live Activity実装
  - `index.swift`: ウィジェットバンドルのエントリーポイント
  - `expo-target.config.js`: Expoターゲット設定

- **データ連携モジュール**: `/modules/widget-data/` にExpo Moduleとして実装
  - アプリからウィジェットへのデータ共有機能
  - App GroupsまたはUserDefaultsを使用してデータを永続化
  - `expo-module.config.json`: iOS専用のExpo Module設定

#### Android ウィジェット
- **実装コード**: `/src/widget/android/`
  - `HelloWidget.tsx`: サンプルウィジェットUI（`react-native-android-widget`使用）
  - `widget-task-handler.tsx`: ウィジェットライフサイクル管理

### 使用技術
- **iOS**: WidgetKit + SwiftUI + App Intents
- **Android**: `react-native-android-widget` (^0.17.2)
- **データ共有**: Expo Modules API

### 開発時の注意
- iOS ウィジェットは `bun expo prebuild -p ios --clean` 後にXcodeでのビルドが必要
- Android ウィジェットは `index.ts` で `widgetTaskHandler` を登録
- ウィジェット用のデータ更新は `/modules/widget-data/` のAPIを経由

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
│   ├── data/                # データ層（repositories、providers、mappers）
│   └── widget/              # ウィジェット実装
│       └── android/         # Androidウィジェット（React Native）
│
├── modules/
│   └── widget-data/         # iOSウィジェットデータ連携（Expo Module）
│       └── ios/             # Swift実装
│
├── targets/
│   └── widget/              # iOSウィジェット本体（WidgetKit）
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


### デバッグ画面

開発中は `app/debug/` の画面群を活用できます：
- `/debug` - デバッグメニュー
- `/debug/zustand` - Zustand状態の可視化
- `/debug/update` - アップデート機能のテスト

## 📦 ビルドとデプロイ

### ローカルビルド

```bash
# 開発用ビルド
bun run devbuild:ios      # iOS
bun run devbuild:android  # Android
```

### 本番リリース (EAS使用)

```bash
# iOS Production Build + App Store Submit
bun run build:ios
eas submit -p ios --path ./production.ipa

# Android Production Build + Google Play Submit
bun run build:android
eas submit -p android --path ./production.aab
```

**注意**:
- EAS CLIがインストールされている必要があります
- EASプロジェクトへのアクセス権限が必要です (Owner: passpal)
- 本番ビルドは自動的にバージョン番号がインクリメントされます (`eas.json`の`autoIncrement`設定)

### Expo Updates (OTA)

Runtime Versionが同じであれば、JavaScriptバンドルのみの更新がWiFi接続時に自動配信されます。

```bash
# 本番用OTAアップデートの公開
eas update
```

## 🐛 トラブルシューティング

### キャッシュクリア

```bash
expo start -c
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

---

**Made with ❤️ by PassPal Project**
