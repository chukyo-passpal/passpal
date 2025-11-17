# コードスタイル指針

## TypeScript

- Keep `tsconfig.json` strict: `strict`, `noImplicitReturns`, `noImplicitOverride`, `noFallthroughCasesInSwitch`,
  `noUncheckedIndexedAccess` を外さない。
- Resolve imports with `@/*` 絶対パスを必ず使い、相対パスの階段を残さない。

## フォーマット

- すべて `bun run format` で整形し、Prettier (120 cols, tabWidth 4, double quote, semi) 設定を触らない。
- `@ianvs/prettier-plugin-sort-imports` で React→Expo→3rd→内部→相対の順に並べる。手動整列は禁止。

## Lint

- 変更前後で `bun run lint` (または `expo lint`) を走らせ、Expo ルール違反をゼロにする。
- `dist/*` をリンティング対象に含めない。

## 命名

- Component & 型: PascalCase (`Button.tsx`, `AssignmentModel`)。
- hooks/関数/変数: camelCase + `use` prefix を守る。
- Service / Repository / Provider / Mapper: camelCase + サフィックス (`assignmentService.ts`)。
- ディレクトリ: kebab-case か camelCase。混在させない。

## レイヤー規約

- UI は Service/Usecase だけを呼ぶ。Repository や Provider を直 import したら即修正。
- Domain は Repository interface だけを参照。Data は UI/Domain を知らない。
- Zustand の set は Service 経由で行い、UI で直接 `setState` しない。

## コンポーネント

- Pure component だけ `components/` に置き、副作用は hook へ移す。
- 重要コンポーネントには `*.stories.tsx` を用意し、変化ごとに Storybook を更新する。

## ドキュメント / コメント

- 公開 API (Usecase, Service, Repository) と複雑なロジックにだけ JSDoc/TSDoc を追加し、冗長な説明は削る。
- README やメモリーファイルは変更時に即更新する。

## Git / Storybook / その他

- Storybook 生成は `bun run storybook-generate` で自動化し、手動コピーを禁止。
- Expo Managed Workflow + Tamagui + Zustand の組み合わせを前提に設計し、逸脱する場合はメンテナに相談する。
- パフォーマンス最適化 (`React.memo`, `useMemo`, `useCallback`, `FlatList`) とアクセシビリティ属性は常に考慮する。
