# Repository Guidelines

## プロジェクト構成
- `app/`: Next.js App Router のページと `globals.css` を配置。
- `components/`: 再利用 UI（例: `RankingList.tsx`, `OfficeCard.tsx`）。
- `data/`: 静的データ（例: `offices.ts`）。
- `utils/`: 共通ロジック（例: `rankingEngine.ts`）。
- `types/`: 共有型定義（`index.ts`）。
- `public/`: 画像などの静的アセット。

## ビルド・開発コマンド
- `npm run dev`: 開発サーバー起動。
- `npm run build`: 本番ビルド生成。
- `npm run start`: ビルド成果物を起動。
- `npm run lint`: Next.js の Lint を実行。

## コーディングスタイル
- TypeScript + React、4スペースのインデント（例: `app/page.tsx`）。
- コンポーネントは PascalCase、ユーティリティは camelCase。
- Tailwind CSS を使用。クラスはレイアウト/余白/文字装飾の順で整理。

## テスト指針
- 現状、テスト基盤は未導入。
- 追加する場合は `components/__tests__/` などに配置し、実行コマンドを明記。

## コミット・PR
- 履歴は短い命令形の英語（例: "Configure GitHub Pages deployment"）。
- PR は変更概要、関連 Issue、UI 変更時のスクリーンショットを含める。

## 設定メモ
- Next.js: `next.config.js`、Tailwind: `tailwind.config.ts`。
- 環境変数を追加する場合はドキュメント化し、機密情報はコミットしない。
