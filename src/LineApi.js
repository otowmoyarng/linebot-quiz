const LINEAPI_PushMessage_Broadcast = 'https://api.line.me/v2/bot/message/broadcast';
const CHANNEL_ACCESS_TOKEN = Sheet.Config.getRange('Token').getValue();

class LineApi {
    GetToken() {
        return Sheet.Config.getRange('Token').getValue();
    }

    /**
     * LineBotへテキストメッセージを送信する
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