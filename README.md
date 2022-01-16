# linebot-quiz
LINEDC企画用として作成したLINEBOT

# 環境構築

実行するコマンド

```bash
npm init -y
npm install @google/clasp
npm install google-apps-script
```

Googleアカウントで認証する
claspコマンドが認識されていない時は`Node.js command prompt`から実行する
または、`Node.js command prompt`のプロパティにあるコマンドをVSCodeのターミナル(コマンドプロンプト)で実行する

```bash
clasp login
```

ターミナル上に出力されたURLへアクセスすると、ログインと権限の許可が求められるので、
ログインするGoogleアカウントを選択し、claspからのアクセスを許可する。
表示された認証コードをターミナルにコピペすると認証が完了する

# デプロイ

```bash
clasp push
```

jsファイルからgsファイルが作成され、GASプロジェクトにアップロードされる
実行時はファイルの順序でロードされるようなので、他のモジュールを参照するものはロード順を意識する必要がある。
src階層内のソースはデプロイ後に入れ替えが必要となる。

1. SheetAccessor.gs
1. Logs.gs
1. LineApi.gs