# 開発ガイドライン

## レイヤー規律
- 強制的に `UI → Domain → Data` の順で依存させ、逆参照をレビューで弾く。
- UI は Service/Usecase 経由でしかデータに触れない。違反を見つけたら即リファクタ。
- Domain は Repository interface のみを import し、実装や Provider 詳細を知らない状態を維持する。
- Data は外部 IO と変換だけを担当し、上位層の型や Zustand を import しない。

## カスタムフック
- 画面固有の挙動を `src/presentation/hooks/` にまとめ、Zustand state 取得と Service 呼び出しを提供する。
- hook 内にビジネスルールや複雑なバリデーションを置かない。必要なら Usecase/Service へ退避。
- ハンドラはすべて `useCallback` で公開し、UI から直接非同期処理を走らせない。

## Service / Usecase
- Usecase で 1 目的をカプセル化し、Repository とモデル操作だけを実行する。
- Service で複数 Usecase + Zustand 更新をまとめ、UI が呼べる唯一の facade にする。
- 取得→検証→状態更新の順を守り、副作用を 1 箇所に閉じ込める。

## Repository / Provider / Mapper
- Repository は Provider と Mapper を束ねた薄い層として実装し、キャッシュ戦略やフォールバックもここで制御する。
- Provider はデータソース別に分割し、HTTP/HTML/キャッシュなどの IO を Client/Parser に委譲する。
- Mapper で型整合性を保証し、無効データを Domain Error に変換する。生データを直接返さない。

## Zustand
- Store 更新は Service からのみ実行し、UI や hook で `setState` しない。
- Store は slice ごとにファイルを分け、初期状態と action 名を明示する。
- デバッグ用画面 (`app/debug/`) で state を視覚化し、変更時はここも更新する。

## コンポーネント設計
- Pure component を `components/` に集約し、props + callback だけで描画する。
- Container (screen) では hook を呼び、pure component へデータを渡す。副作用は hook に限定。
- 主要コンポーネントは Storybook でケースを網羅し、UI 変更時に `bun run storybook-generate` を必ず再実行する。

## エラーハンドリング
- Data 層で `NetworkError`, `ParseError`, `AuthError` を投げ、Domain 層で `ServiceError` にマップする。
- UI 層は `ErrorFallback` と `GlobalErrorBoundary` で例外を吸収し、ユーザー向けメッセージを表示する。

## テスト / 品質
- Usecase/Service/Repository を単体テスト可能に設計し、モックは interface 注入で差し替える。
- PR 前に `bun run lint`, `bun run format`, `tsc --noEmit` を必ず通す。失敗したままコミットしない。
- 大規模変更時は `bun run start` で実機確認し、必要に応じて `bun run build:ios|android` でビルドチェックする。

## パフォーマンス / アクセシビリティ
- 重い計算やハンドラは `useMemo` / `useCallback` / `React.memo` で囲い、リスト描画は `FlatList`/`SectionList` を使う。
- Tamagui コンポーネントでアクセシビリティ属性 (`accessibilityLabel`, `Hint`, `Role`) を必ず設定する。
- ネットワーク呼び出しはキャンセル可能な設計にし、画面アンマウント時にリークを防ぐ。

## ベストプラクティス
- `any` を避け、Zod などで型安全を保つ。
- DRY を守り、共通処理は Utility/Service に昇格させる。
- 変更時は関連ドキュメントとメモリーファイルを同時に更新し、情報の陳腐化を阻止する。
