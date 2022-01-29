/**
 * LINEからのwebhookに対応するエントリポイント
 * @param request HTTPRequest
 */
function doPost(request) {

    try {
        // POSTリクエストをJSONデータにパース
        const receiveJSON = JSON.parse(request.postData.contents);
        const event = receiveJSON.events[0];

        routing(event);

    } catch (ex) {
        console.error("エラー発生", ex);
    }
}

function routing(event) {
    Logger.WriteLog(`event.type:${event.type}, userId:${event.source.userId}, test:${event.message.text}, replyToken:${event.replyToken}`);

    // アクセスユーザーを登録
    if (event.type == 'follow') {
        return follow(event.source.userId);
    }

    // ブロックされたとき、該当ユーザーを削除
    if (event.type == 'unfollow') {
        return unfollow(event.source.userId);
    }

    let status = sheetAccessor.getStatus();

    // クイズ中
    if (status === State.Answering) {
        return quiz.Question(event.replyToken);
        // 第１問を出す
    } else if (event.message.text === Operation.Start) {
        return quiz.Start(event.replyToken);
    } else {
        // TODO
        const replyMessages = [
            `event.type:${event.type}`,
            `userId:${event.source.userId}`,
            `text:${event.message.text}`,
            `replyToken:${event.replyToken}`,
        ];
        replyMessages.forEach((message) => {
            Logger.WriteLog(message);
        });
        return LineApiDriver.replyText(event.replyToken, replyMessages);
        // TODO
    }
}