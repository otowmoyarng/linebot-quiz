/**
 * LINEからのwebhookに対応するDispacher
 * @param request HTTPRequest
 */
function doPost(request) {

    // POSTリクエストをJSONデータにパース
    const receiveJSON = JSON.parse(request.postData.contents);
    const event = receiveJSON.events[0];
    console.log(`event.type:${event.type}, userId:${event.source.userId}, test:${event.message.text}, replyToken:${event.replyToken}`);

    // アクセスユーザーを登録
    if (event.type == 'follow') {
        return follow(event.source.userId);
    }

    // ブロックされたとき、該当ユーザーを削除
    if (event.type == 'unfollow') {
        return unfollow(event.source.userId);
    }

    if (event.message.text === Operation.Start) {

    }
}