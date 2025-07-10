# Cline Rules

すべて日本語でやり取りします。

## アプリ概要

`README.md` を参照しなさい。

## コーディングルール

- 変数名, 関数名は lowerCamelCase を使うこと
- 型名, クラス名は UpperCamelCase を使うこと
- プライベート関数には `_` を先頭につけること
- 配列の変数名は複数形を使うこと
  - list や array は使用不可
- ディレクトリ名は単数形を使うこと

### ディレクトリ

- `src/test/` テストコード用のディレクトリ
  - `src/` 直下と同じディレクトリ構造であること
- `src/type` 型定義ディレクトリ
- `src/lib/function` 単純な関数定義ディレクトリ
- `src/lib/class` クラス定義ディレクトリ
- `src/lib/service` ビジネスロジック定義ディレクトリ
- `src/lib/repository` 外部連携定義ディレクトリ
- `src/lib/utility` 静的メソッドのみのクラス定義ディレクトリ

### オブジェクト構造

- 本アプリのクラスは下記のいずれかに属す
  - `entity`
    - アプリ内で使用するオブジェクトクラス
  - `service`
    - `entity` に対して処理を実行し `repository` を実行するオーケストレータ
  - `repository`
    - `entity` と外部(外部システムやファイル)とやり取りする仲介者
  - `utility`
    - 同種な関数を単純にまとめたクラス
    - インスタンス化せずに使う

## Git ルール

### コミット

- コミットメッセージは [gitmoji](https://gitmoji.dev/) に基づいてプレフィクスにつけなさい
- コミットは [gitmoji](https://gitmoji.dev/) の分類に基づいて分けなさい
- コミットは `(プレフィクス) (コミット内容)` の形式で切りなさい
  - 例： `✨ 単語辞書検索機能を追加`

## ブランチ

- 本番ブランチは `main`
- 開発マスターブランチは `develop`
- 開発ブランチは `develop` から派生させること
  - 開発ブランチ名は `(fix|feature|refactor)/(修正内容を英語で)`
    - 例： `fix/dictionary-map`, `feature/llm-assist-chat`
