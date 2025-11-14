# タスク完了チェック

1. `bun run format` を実行し、全ファイルを自動整形する。
2. `bun run lint` で警告ゼロを確認する。
3. `bun tsc --noEmit` で型エラーを潰す。
4. 大きな変更なら `bun run start` で動作確認し、必要に応じて `bun run build:ios|android` を通す。
5. Storybook 影響があれば `bun run storybook-generate` を再実行する。
6. 関連ドキュメントとメモリーファイルを更新する。
7. package.jsonのバージョンが変わったら `bun run license:update` を実行する。
