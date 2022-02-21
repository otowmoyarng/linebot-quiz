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

```bash
clasp login
```

claspコマンドが認識されていない時は`Node.js command prompt`から実行する
または、`Node.js command prompt`のプロパティにあるコマンドをVSCodeのターミナル(コマンドプロンプト)で実行する

```cmd
C:\Windows\System32\cmd.exe /k "C:\Program Files\nodejs\nodevars.bat"
```

ターミナル上に出力されたURLへアクセスすると、ログインと権限の許可が求められるので、
ログインするGoogleアカウントを選択し、claspからのアクセスを許可する。
表示された認証コードをターミナルにコピペすると認証が完了する

# デプロイ

```bash
clasp push
```

jsファイルからgsファイルが作成され、GASプロジェクトにアップロードされる
実行時はファイルの順序でロードされるため、他のモジュールを参照するものはロード順を意識する必要がある。
src階層内のソースはデプロイ後に入れ替えが必要となる。

1. Const.gs
1. SheetAccessor.gs
1. LineApi.gs
1. User.gs
1. Logs.gs
1. Dispatcher.gs

---

```bash
clasp deploy --deploymentId {deployId} --description "{description}"
```

GASプロジェクトをデプロイする。外部から使用可能となる。

## MessagingAPIについて

[公式ドキュメント](https://developers.line.biz/ja/docs/messaging-api/)はこちら

<details>
<summary>応答メッセージ</summary>

```json
{
    "replyToken": "Webhookイベントに含まれている応答トークン",
    "messages": [
        {
            "type": "text",
            "text": "送信メッセージ"
        }
    ]
}
```

</details>

<details>
<summary>プッシュメッセージ</summary>

```json
{
    "to": "ユーザー、グループ、トークルームのID",
    "messages": [
        {
            "type": "text",
            "text": "送信メッセージ"
        }
    ]
}
```

</details>

<details>
<summary>ボタンテンプレート</summary>

```json
{
    "type": 'template',
    "altText": 'altText',
    "template": {
        "type": 'buttons',
        "thumbnailImageUrl": '画像URL',
        "imageAspectRatio": '画像のアスペクト rectangle/square',
        "imageSize": '画像の表示形式   cover/contain',
        "imageBackgroundColor": '画像の背景色 HTTPカラーコード',
        "title": 'タイトル',
        "text": ' メッセージテキスト',
        "actions": []
    }
}
```

</details>

<details>
<summary>確認テンプレート</summary>

```json
{
    "type": 'template',
    "altText": 'altText',
    "template": {
        "type": 'confirm',
        "text": ' メッセージテキスト',
        "actions": []
    }
}
```

</details>

<details>
<summary>メッセージアクション</summary>

```json
{
    "type": 'message',
    "label": 'アクションのラベル',
    "text": 'アクションの実行時に送信されるテキスト',
}
```

</details>
