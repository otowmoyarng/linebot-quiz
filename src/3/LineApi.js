const LineAPI_EntryPoint = {
    Broadcast: 'https://api.line.me/v2/bot/message/broadcast',
    Reply: 'https://api.line.me/v2/bot/message/reply',
    Push: 'https://api.line.me/v2/bot/message/push',
    MultiCast: 'https://api.line.me/v2/bot/message/multicast',
    Profile: 'https://api.line.me/v2/bot/profile/',
    RichMenu: 'https://api.line.me/v2/bot/richmenu',
    UploadRichMenu: 'https://api-data.line.me/v2/bot/richmenu',
    AttachRichMenu: 'https://api.line.me/v2/bot/user'
};
const ReplyMessageSendMaxCount = 5;
const ChannelAccessToken = Sheet.Config.getRange('Token').getValue();
const OptionBase = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ChannelAccessToken,
    },
    payload: ''
};

class LineApi {

    /**
     * テキストメッセージをリプライ送信する
     * 
     * @param replyToken リプライトークン
     * @param replyMessages 返信するメッセージ配列
     */
    ReplyTextMessage(replyToken, replyMessages) {
        const messages = [];
        replyMessages.forEach((m) => {
            messages.push({
                type: 'text',
                text: m
            })
        })

        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            replyToken: replyToken,
            messages: messages
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Reply, options);
    }

    /**
     * 確認テンプレートメッセージをリプライ送信する
     * 
     * @param replyToken リプライトークン
     * @param question 質問内容
     * @param choices 選択肢
     */
    ReplyConfirmMessage(replyToken, question, choices) {
        const actions = [];
        choices.split(',').forEach(choice => {
            actions.push({
                type: 'message',
                label: choice,
                text: choice
            });
        });

        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            replyToken: replyToken,
            messages: [{
                type: 'template',   // template固定
                altText: 'altText', // 代替テキスト
                template: {
                    type: 'confirm',    // button固定
                    text: question,     // メッセージテキスト
                    actions: actions    // タップされたときのアクション
                }
            }]
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Reply, options);
    }

    /**
     * ボタン型テンプレートメッセージをリプライ送信する
     * 
     * @param replyToken リプライトークン
     * @param title title
     * @param imgSrc 画像URL
     * @param question 質問内容
     * @param choices 選択肢
     */
    ReplyButtonMessage(replyToken, title, imgSrc, question, choices) {
        const actions = [];
        choices.split(',').forEach(choice => {
            actions.push({
                type: 'message',
                label: choice,
                text: choice
            });
        });

        let template = {
            type: 'template',   // template固定
            altText: 'altText', // 代替テキスト
            template: {
                type: 'buttons',                // button固定
                imageAspectRatio: 'rectangle',  // 画像のアスペクト rectangle/square
                imageSize: 'contain',           // 画像の表示形式 cover/contain
                title: title,                   // タイトル
                text: question,                 // メッセージテキスト
                actions: actions                // タップされたときのアクション
            }
        };
        if (!IsNullOrEmpty(imgSrc)) {
            template.template['thumbnailImageUrl'] = imgSrc;
        }
        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            replyToken: replyToken,
            messages: [template]
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Reply, options);
    }

    /**
     * ブロードキャストメッセージを送る
     * @param   message 送信メッセージ
     */
    BroadcastMessage(message) {
        const payload = {
            messages: [
                { type: 'text', text: message }
            ]
        };

        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify(payload);
        UrlFetchApp.fetch(LineAPI_EntryPoint.Broadcast, options);
    }

    /**
     * プッシュメッセージを送る
     * @param userId ユーザーID
     * @param pushmessage メッセージオブジェクト
     */
    PushTextMessage(userId, pushmessage) {
        const messages = [];
        pushmessage.forEach((m) => {
            messages.push({
                type: 'text',
                text: m
            })
        })

        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            to: userId,
            messages: messages
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Push, options);
    }

    /**
     * 確認テンプレートメッセージをプッシュ送信する
     * 
     * @param userId ユーザーID
     * @param question 質問内容
     * @param choices 選択肢
     */
    PushConfirmMessage(userId, question, choices) {
        const actions = [];
        choices.split(',').forEach(choice => {
            actions.push({
                type: 'message',
                label: choice,
                text: choice
            });
        });

        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            to: userId,
            messages: [{
                type: 'template',   // template固定
                altText: 'altText', // 代替テキスト
                template: {
                    type: 'confirm',    // button固定
                    text: question,     // メッセージテキスト
                    actions: actions    // タップされたときのアクション
                }
            }]
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Push, options);
    }

    /**
     * ボタンテンプレートメッセージをプッシュ送信する
     * 
     * @param userId ユーザーID
     * @param title title
     * @param imgSrc 画像URL
     * @param question 質問内容
     * @param choices 選択肢
     */
    PushBottunMessage(userId, title, imgSrc, question, choices) {
        const actions = [];
        choices.split(',').forEach(choice => {
            actions.push({
                type: 'message',
                label: choice,
                text: choice
            });
        });

        let template = {
            type: 'template',   // template固定
            altText: 'altText', // 代替テキスト
            template: {
                type: 'buttons',                // button固定
                imageAspectRatio: 'rectangle',  // 画像のアスペクト rectangle/square
                imageSize: 'contain',           // 画像の表示形式 cover/contain
                title: title,                   // タイトル
                text: question,                 // メッセージテキスト
                actions: actions                // タップされたときのアクション
            }
        };
        if (!IsNullOrEmpty(imgSrc)) {
            template.template['thumbnailImageUrl'] = imgSrc;
        }
        let options = Object.assign({}, OptionBase);
        options.payload = JSON.stringify({
            to: userId,
            messages: [template]
        });
        UrlFetchApp.fetch(LineAPI_EntryPoint.Push, options);
    }
}

const LineApiDriver = new LineApi();