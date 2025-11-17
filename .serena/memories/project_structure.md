# プロジェクト構造

## ルート

```
passpal/
├── app/              # Expo Router 画面
├── src/              # presentation / domain / data
├── assets/           # 画像・フォント
├── ios/              # Expo prebuild 生成物
├── android/          # Expo prebuild 生成物
├── scripts/          # CLI ユーティリティ
├── configs           # tsconfig, eslint, prettier, babel, metro, tamagui
├── app.json, eas.json, firebase.json, google-services.json, GoogleService-Info.plist
```

- 依存は Bun (`bun.lock`) で固定。`dist/` と `build-*.ipa` は成果物。

## `app/`

- `_layout.tsx` でルート構造を定義し、`(tabs)/index|assignments|timetable|bus` が主要タブ。
- `settings/`, `login/`, `setup/`, `debug/`, `force-update.tsx`, `license.tsx`, `maintenance.tsx`
  など個別フローをファイル単位で配置。
- 画面ファイルは UI ロジックの薄いコンテナとして保ち、hook + component を呼ぶだけにする。

## `src/presentation/`

- `components/` に pure UI。`*.stories.tsx` で Storybook を同期。
- `hooks/` に画面ロジック (`useAssignment`, `useTimetable`, `useClass`, `useMail`, `useNews`, `useAuth`, `useSetting`,
  `useToast`, `useAppInit`)。
- `tokens/` に `colors.ts`, `typography.ts`, `spacing.ts`。
- `errors/` に `ErrorFallback`, `GlobalErrorBoundary` 等をまとめる。

## `src/domain/`

- `usecase/` にユースケース、`services/` に facade、`models/` にエンティティ。
- `constants/` と `errors/` でルールを共有。Zustand store はここから操作する。

## `src/data/`

- `repositories/` が Domain へ公開される唯一の窓口。
- `providers/` はソース別 (`chukyo-univ`, `chukyolink`, `firebase`, `palapi`, `cache`) に実装。
- `clients/` に HTTP/認証、`mappers/` に型変換、`types/` と `constants/` と `errors/` で補助定義を保持。
- HTML 解析は `@chukyo-passpal/web_parser` パッケージを `parser/` で利用する。

## `src/widget/`

- `android/` に Android ウィジェット実装を配置。
- `HelloWidget.tsx` がサンプルウィジェット UI（`react-native-android-widget` 使用）。
- `widget-task-handler.tsx` で WIDGET_ADDED, WIDGET_UPDATE などのライフサイクルイベントを管理。

## `modules/widget-data/`

- iOS ウィジェットとメインアプリ間のデータ共有用 Expo Module。
- `ios/WidgetDataModule.swift` にネイティブモジュール定義。
- `expo-module.config.json` で iOS 専用モジュールとして設定。
- App Groups や UserDefaults を使ってウィジェットにデータを渡す。

## `targets/widget/`

- iOS ウィジェット本体の実装（WidgetKit + SwiftUI）。
- `index.swift` でウィジェットバンドルをエクスポート。
- `widgets.swift` にメインウィジェット（Timeline Provider ベース）。
- `WidgetControl.swift` にコントロールウィジェット。
- `WidgetLiveActivity.swift` に Live Activity 実装。
- `expo-target.config.js` で Expo ターゲット設定（type: "widget"）。

## その他

- `scripts/` にビルド・ライセンス生成 CLI。
- `.expo/`, `.rnstorybook/`, `dist/` などは生成物のため基本的に触らない。
