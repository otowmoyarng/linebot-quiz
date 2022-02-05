/**
 * 書き込み用テスト
 */
function WriteLog() {
    const messages = ["hogehoge", "fugauga", "amazon"];
    messages.forEach(m => Logger.WriteLog(m));

    const loglist = Sheet.Logs.getDataRange().getValues();
    for (var index = 0; index < loglist.length; index++) {
        console.log(`row${index}, Date:${loglist[index][0]}, Message:${loglist[index][1]}`);
    }
}