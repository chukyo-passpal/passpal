# PassPal アーキテクチャ

## レイヤー方針

- Enforce `UI → Domain → Data` の一方向依存。逆流と循環を即時排除。
- Keep UI on rendering/input only, Domain on rules, Data on IO +変換。

## UI 層 `app/`, `src/presentation/`

- 絶対にビジネスロジックを持たず、Service/Usecase だけを呼び出す。
- 画面は Expo Router で構築し `(tabs)`, `settings`, `login`, `setup` などのファイルでルーティングを完結させる。
- コンポーネントは `components/` に集約し、`*.stories.tsx` で可視化。副作用と状態は持たない。
- 画面固有ロジックは `hooks/` に閉じ込め、Zustand 読み取り + Service 呼び出しに専念させる。
- グローバル状態を直接 mutate せず、Service で整形してから set する。
- デザイントークンは `tokens/` に固定し、色・余白・タイポをそこから参照する。

## ドメイン層 `src/domain/`

- Usecase で「目的」を 1 関数にまとめ、Repository インターフェースだけに依存させる。
- Service で複数 Usecase や Zustand 更新をオーケストレーションし、UI へ公開する唯一の API にする。
- モデルはエンティティの不変条件を保持し、検証ロジックをここに集約する。
- 定数・エラーを `constants/`, `errors/` に明示して横断参照を避ける。

## データ層 `src/data/`

- Repository を唯一のエントリポイントにし、Provider + Mapper + Parser をそこで束ねる。
- Provider は `chukyo-univ`, `chukyolink`, `firebase`, `palapi`, `cache`
  などソース別に実装し、通信は Client へ委譲する。
- Client で HTTP, Cookie, Header, 認証 (Shibboleth) を処理し、例外を層内エラーに変換する。
- Mapper で型変換とバリデーションを行い、常にドメインモデルを返す。
- HTML 解析は `@chukyo-passpal/web_parser` に任せ、結果を Parser で JSON 化する。
- 型・定数・エラーは `types/`, `constants/`, `errors/` に分離して再利用する。

## 依存ルール

```
UI → Domain → Data → Provider → Client → External
```

- UI と Data の直接通信を禁止。
- Domain は実装詳細を知らず、Data は上位を知らない状態を保つ。

## 利点を維持せよ

- 関心を分離して変更衝撃を最小化。
- Provider/Mapper を差し替えて外部仕様変更に即応。
- インターフェース単位でモックし、Service/Usecase を単体テスト可能に保つ。
