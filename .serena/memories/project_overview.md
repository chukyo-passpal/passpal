# プロジェクト概要

## 目的

- PassPal で中京大学の ALBO / MaNaBo
  / ポータル等を横断し、学生の時間割・課題・バス・ニュース・メール・クラス情報を 1 画面で確認できるようにする。
- iOS/Android 両方に Expo で同一コードを配信する。

## 技術スタック

- React Native 0.81 + React 19 + Expo Router 6 + TypeScript 5.9。
- Tamagui + Lucide + Reanimated + Gesture Handler で UI/アニメーションを統一。
- 状態は Zustand 5 + Immer で一元管理。
- データ取得は `@chukyo-passpal/web_parser`, WebView, Cookies ライブラリを組み合わせる。
- Firebase (Analytics/Auth/Remote Config/Messaging) と Google Sign-In を必ず統合する。
- バリデーションは Zod。ツールは ESLint 9 + Prettier 3 + Storybook 9 + Bun。
- ビルド/配信は EAS (iOS bundle id `app.chukyopasspal.passpal`, Android package `app.chukyopasspal.passpal`) を使う。

## ウィジェット機能

- **iOS**: `/targets/widget/` に WidgetKit + SwiftUI で実装。Timeline Provider でデータ更新、App
  Intents でインタラクティブ操作に対応。
- **Android**: `/src/widget/android/` に `react-native-android-widget` (^0.17.2) で実装。
- **データ共有**: `/modules/widget-data/` の Expo Module を使い、iOS ウィジェットとメインアプリ間でデータを共有。
- ウィジェットは `bun expo prebuild -p ios --clean` 後に Xcode でビルドが必要（iOS）。

## ビルド/デプロイ戦略

- Expo Managed Workflow を維持し、EAS で iOS `.ipa` / Android `.aab` を生成。
- Firebase・Google Service 設定ファイルを常に最新の環境と同期させる。
