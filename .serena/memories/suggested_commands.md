# 推奨コマンド

## セットアップ

```bash
bun install            # 依存取得
```

## 開発

```bash
bun run start          # Expo Dev Server
bun run ios            # iOS シミュレータ
bun run android        # Android エミュレータ
bun run storybook-generate  # Storybook 同期
```

## 品質

```bash
bun run format         # Prettier + import sort
bun run lint           # ESLint (expo config)
bun tsc --noEmit           # 型チェック
```

## ビルド / 配信

```bash
bun run prebuild                 # ネイティブ生成
bun run devbuild:ios|android        # ローカル dev build
bun run build:ios|android       # Production build
eas submit -p ios|android --path ./production.ipa|.aab   # ストア提出
```

## ライセンス

```bash
bun run license:update           # 依存ライセンス出力
bun run license:summary          # サマリー表示
```

## トラブルシュート

```bash
expo start -c            # キャッシュクリア
bun outdated             # 依存更新確認
expo doctor              # 環境診断
```
