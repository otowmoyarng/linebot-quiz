function getUserId(key) {
    const value = PropertiesService.getScriptProperties().getProperty(key);
    if (value === null) {
        console.error(`key[${key}]がプロパティに存在しません。`);
    }
    return value;
}
function TestBroadcastMessage() {
    const messsage = 'これは送信テストです';
    LineApiDriver.BroadcastMessage(messsage);
}

function TestPushMessage() {
    console.log("テキストメッセージ：プッシュ送信開始");
    LineApiDriver.PushTextMessage(getUserId(GASPropertiesKey.UserId), ["pushメッセージ送信", "abcde"]);
    console.log("テキストメッセージ：プッシュ送信完了");
}

function TestPushConfirmMessage() {
    console.log("確認テンプレートメッセージ：プッシュ送信開始");
    const quizes = quiz.getAll();
    quizes.forEach(quizItem => {
        if (quizItem.QuizType === QuestionType.Confirm) {
            console.log("Quiz:", quizItem);
            LineApiDriver.PushConfirmMessage(getUserId(GASPropertiesKey.UserId), quizItem.Question, quizItem.Choices);
        }
    });
    console.log("確認テンプレートメッセージ：プッシュ送信終了");
}

function TestPushButtonMessage() {
    console.log("ボタンテンプレートメッセージ：プッシュ送信開始");
    const quizes = quiz.getAll();
    quizes.forEach(quizItem => {
        if (quizItem.QuizType === QuestionType.Button) {
            console.log("Quiz:", quizItem);
            LineApiDriver.PushBottunMessage(getUserId(GASPropertiesKey.UserId), quizItem.QuizNo, quizItem.Imgsrc, quizItem.Question, quizItem.Choices);
        }
    });
    LineApiDriver.PushBottunMessage(getUserId(GASPropertiesKey.UserId), '結果発表', null, quiz.Score(), `${Operation.Again},${Operation.Scoring}`);
    console.log("ボタンテンプレートメッセージ：プッシュ送信終了");
}