const LineAPI_EntryPoint = {
    Reply: 'https://api.line.me/v2/bot/message/reply',
    MultiCast: 'https://api.line.me/v2/bot/message/multicast',
    Profile: 'https://api.line.me/v2/bot/profile/',
    RichMenu: 'https://api.line.me/v2/bot/richmenu',
    UploadRichMenu: 'https://api-data.line.me/v2/bot/richmenu',
    AttachRichMenu: 'https://api.line.me/v2/bot/user'
};
// const LINE_API_REPLY = 'https://api.line.me/v2/bot/message/reply';
// const LINE_API_MULTICAST = 'https://api.line.me/v2/bot/message/multicast';
// const LINE_API_PROFILE = 'https://api.line.me/v2/bot/profile/';
// const LINE_API_RICHMENU = 'https://api.line.me/v2/bot/richmenu';
// const LINE_API_UPLOAD_RICHMENU_IMG = 'https://api-data.line.me/v2/bot/richmenu';
// const LINE_API_ATTACH_RICHMENU_USER = 'https://api.line.me/v2/bot/user';
const LINEAPI_PushMessage_Broadcast = 'https://api.line.me/v2/bot/message/broadcast';
const CHANNEL_ACCESS_TOKEN = Sheet.Config.getRange('Token').getValue();

class LineApi {
    GetToken() {
        return Sheet.Config.getRange('Token').getValue();
    }

    getUserDisplayName(userId) {
        const url = LineAPI_EntryPoint.Profile + userId;
        const userProfile = UrlFetchApp.fetch(url, {
            headers: {
                Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
        });
        return JSON.parse(userProfile).displayName;
    }

    /**
     * テキストメッセージを返信する
     * 
     * @param replyToken リプライトークン
     * @param replyMessages 返信するメッセージ配列
     */
    replyText(replyToken, replyMessages) {
        const messages = [];
        replyMessages.forEach((m) => {
            messages.push({
                type: 'text',
                text: m
            })
        })

        const replyText = Object.assign({}, ReplyMessages);
        replyText.replyToken = replyToken;
        replyText.messages = messages;

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            payload: JSON.stringify(replyText),
        };
        UrlFetchApp.fetch(LineAPI_EntryPoint.Reply, options);
    }

    /**
     * 
     */
    replyConfirm() {

    }

    /**
     * LineBotへテキストメッセージを送信する
     * @param   message 送信メッセージ
     */
    SendBroadcast(message) {
        const payload = {
            messages: [
                { type: 'text', text: message }
            ]
        };

        const options = {
            contentType: 'application/json',
            headers: {
                Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
            },
            payload: JSON.stringify(payload)
        };
        UrlFetchApp.fetch(LINEAPI_PushMessage_Broadcast, options);
    }
}

const LineApiDriver = new LineApi();