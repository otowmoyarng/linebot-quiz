function LineApiTest_convertURL() {
    const urls = [
        "https://drive.google.com/file/d/1H8xmhD9Hfq3Xip5obLZwL70zGkV4CjLI/view?usp=sharin",
        "https://drive.google.com/file/d/1H8xmhD9Hfq3Xip5obLZwL70zGkV4CjLI/view?usp=sharing",
        "https://drive.google.com/file/e/1H8xmhD9Hfq3Xip5obLZwL70zGkV4CjLI/view?usp=sharin",
        "https://drive.google.com/uc?id=1H8xmhD9Hfq3Xip5obLZwL70zGkV4CjLI"
    ];
    urls.forEach(url => {
        console.log(`url:${url}, converted:${LineApiDriver.convertURL(url)}`);
    });
}

function LineApiTest_BroadcastMessage() {
    const messsage = 'これは送信テストです';
    LineApiDriver.BroadcastMessage(messsage);
}

function LineApiTest_PushTextMessage() {
    console.log("テキストメッセージ：プッシュ送信開始");
    LineApiDriver.PushTextMessage(GetTestUserId(), ["pushメッセージ送信", "abcde"]);
    console.log("テキストメッセージ：プッシュ送信完了");
}

function LineApiTest_PushConfirmMessage() {
    console.log("確認テンプレートメッセージ：プッシュ送信開始");
    const quizes = quiz.GetAll();
    quizes.forEach(quizItem => {
        if (quizItem.QuizType === QuestionType.Confirm) {
            console.log("Quiz:", quizItem);
            LineApiDriver.PushConfirmMessage(GetTestUserId(), quizItem.Question, quizItem.Choices);
        }
    });
    console.log("確認テンプレートメッセージ：プッシュ送信終了");
}

function LineApiTest_PushBottunMessage() {
    console.log("ボタンテンプレートメッセージ：プッシュ送信開始");
    const quizes = quiz.GetAll();
    quizes.forEach(quizItem => {
        if (quizItem.QuizType === QuestionType.Button) {
            console.log("Quiz:", quizItem);
            LineApiDriver.PushBottunMessage(getUserId(GASPropertiesKey.UserId), quizItem.QuizNo, quizItem.Imgsrc, quizItem.Question, quizItem.Choices);
        }
    });
    LineApiDriver.PushBottunMessage(getUserId(GASPropertiesKey.UserId), '結果発表', null, quiz.score(), `${Operation.Again},${Operation.Scoring}`);
    console.log("ボタンテンプレートメッセージ：プッシュ送信終了");
}