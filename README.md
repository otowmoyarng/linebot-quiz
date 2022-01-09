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
