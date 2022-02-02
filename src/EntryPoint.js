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
    //Logger.WriteLog(`event.type:${event.type}, userId:${event.source.userId}, test:${event.message.text}, replyToken:${event.replyToken}`);

    // アクセスユーザーを登録
    if (event.type == 'follow') {
        return follow(event.source.userId);
    }

    // ブロックされたとき、該当ユーザーを削除
    if (event.type == 'unfollow') {
        return unfollow(event.source.userId);
    }

    if (sheetAccessor.getStatus() === State.Answering) {
        // クイズ中
        // 回答を記入するし、次の問題を出す
        quiz.Answer(event.message.text);
        return quiz.Question(event.replyToken);
    } else if (event.message.text === Operation.Start || event.message.text === Operation.Again) {
        // クイズ開始
        return quiz.Start(event.replyToken);
    } else if (event.message.text === Operation.Scoring) {
        // クイズ開始
        return quiz.Expose(event.replyToken);
    } else {
        return LineApiDriver.ReplyTextMessage(event.replyToken, ['この操作は対応しておりません。']);
    }
}