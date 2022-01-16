/**
 * LINEからのwebhookに対応するコントローラー
 * @param request HTTPRequest
 */
function doPost(request) {

    // POSTリクエストをJSONデータにパース
    const receiveJSON = JSON.parse(request.postData.contents);
    const event = receiveJSON.events[0];
}