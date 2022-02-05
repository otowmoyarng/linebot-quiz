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

    // 友達追加時またはブロック解除時
    if (event.type == 'follow') {
        return user.Add(event.source.userId);
    }

    // ブロック時
    if (event.type == 'unfollow') {
        return user.Remove(event.source.userId);
    }

    if (sheetAccessor.GetStatus(event.source.userId) === State.Answering) {
        // クイズ中
        // 回答を記入して次の問題を出す
        quiz.Answer(event.message.text, event.source.userId);
        return quiz.Question(event.replyToken, event.source.userId);
    } else if (event.message.text === Operation.Start || event.message.text === Operation.Again) {
        // クイズ開始
        return quiz.Start(event.replyToken, event.source.userId);
    } else if (event.message.text === Operation.Scoring) {
        // 答え合わせ
        return quiz.Expose(event.replyToken, event.source.userId);
    } else {
        return LineApiDriver.ReplyTextMessage(event.replyToken, ['この操作は対応しておりません。']);
    }
}