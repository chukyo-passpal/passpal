# PassPal

## 概要
PassPal は中京大学向けの学修ハブアプリです。ALBO や MaNaBo など複数ポータルの情報を 1 つのモバイルアプリに統合し、課題や時間割、メール通知までを横断的に参照できるようにします。Expo Router を利用したモバイルネイティブ UI と、大学ポータル向けのスクレイピング／API クライアントを組み合わせて構築されています。

## 主要機能
- ホームダッシュボード: ALBO の重要なお知らせ、MaNaBo の未読メール、利用頻度の高い外部リンクをまとめて表示
- 課題一覧: 授業ごとの課題を取得し、締切・進捗ラベル付きでカード表示
- 時間割ビュー: 日／週表示を切り替え可能。授業カードから詳細画面へ遷移し、MaNaBo 授業にディープリンク
- 授業詳細: 授業の資料・課題・お知らせを授業単位で整理（`app/course/[courseId]`）
- 設定画面: キャンパス切り替え、時間割の初期表示モード設定、キャッシュ削除、再ログイン、Storybook へのショートカット

## アーキテクチャのポイント
- データ層: `src/data` に HTTP クライアント、スクレイパー (`@chukyo-passpal/web_parser`)、マッパー、リポジトリを整理
- ドメイン層: `src/domain` にモデル・サービス・定数を配置し、UI からビジネスロジックを分離
- プレゼンテーション層: Tamagui ベースの UI コンポーネント群 (`src/presentation/components`) と Expo Router の画面群 (`app/**`)
- 状態管理: `zustand` を活用し、`useAuth`、`useTimetable` などのカスタムフックとして切り出し
- エラーハンドリング: `src/presentation/errors` のグローバルエラーバウンダリとカスタムエラー型で統一

## 技術スタック
- Expo 54（React Native 0.81 / React 19）
- Expo Router 6 / Tamagui UI / Lucide アイコン
- Firebase（Auth・Analytics・Messaging・Remote Config）連携
- Zustand / Immer / Zod
- Storybook for React Native 9（オンデバイス UI プレビュー）
- Bun 1.x を想定した依存関係管理（`bun.lock` 同梱）

## 必要環境
- Node.js 20 以上
- Bun 1.1 以上（`bun.lock` を利用する場合）
- Expo CLI 6（`npm install --global expo-cli` または `bunx expo`）
- EAS CLI 6 以上（ビルド・配布時に使用）
- Android Studio / Xcode など、Expo が推奨する各プラットフォームのビルド環境
- Firebase プロジェクト用の `google-services.json`（Android）および `GoogleService-Info.plist`（iOS）

## セットアップ手順
1. 依存関係をインストール:
	 ```bash
	 bun install
	 ```
2. Firebase 設定ファイルを配置: `google-services.json` と `GoogleService-Info.plist` を各プラットフォーム用に更新してください（リポジトリの雛形を差し替える想定）。
3. Expo 用の環境変数や秘密情報が必要な場合は、`app.json` や EAS の Secrets を利用して設定してください。

## 開発でよく使うコマンド
- アプリ起動（Expo Dev Tools）: `bun run start`
- Android 実機／エミュレーター: `bun run android`
- iOS シミュレーター: `bun run ios`
- Lint チェック: `bun run lint`
- ネイティブコード生成（クリーン）: `bun run prebuild`
- Storybook 用メタデータ生成: `bun run storybook-generate`

## Storybook の利用方法
- Expo Dev Client で Storybook を確認する場合:
	```bash
	bunx expo start --dev-client --config app/storybook.tsx
	```
	起動後、開発用ビルド済みアプリから接続してオンデバイス Storybook を開きます。
- 既存の Expo プロジェクトから Storybook に切り替える場合は、`app/settings/index.tsx` の開発用ショートカット（`__DEV__` 時のみ表示）も利用できます。

## ディレクトリ構成（抜粋）
```text
app/                  Expo Router の画面定義
	(tabs)/             ホーム・課題・時間割などのタブ
	course/[courseId]/  授業詳細へのスタック遷移
	login/, setup/      認証フローと初期設定ウィザード
.rnstorybook/         React Native Storybook 設定一式
src/
	data/               クライアント・リポジトリ・変換ロジック
	domain/             定数・モデル・サービス
	presentation/       UI コンポーネント・フック・エラーハンドリング
assets/               画像・アイコン
```

## ビルドとリリース
- EAS ビルド: `eas build --profile <development|preview|production> --platform <android|ios>`
	- `development` プロファイルは Dev Client を有効化、`production` はバージョン自動インクリメントを設定済みです。
- アプリ内で Firebase を利用するため、EAS Submit 時には各ストアでの設定も合わせて行ってください。

## 問い合わせ
- バグ報告や要望は GitHub Issues で受け付けています。内部利用の場合は開発チーム（`chukyo-passpal`）まで直接お問い合わせください。

