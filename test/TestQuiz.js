function TestQuiz_GetAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function TestQuiz_Current() {
    const beforeQuizNo = sheetAccessor.getQuizNo();

    // デフォルト値
    sheetAccessor.setQuizNo(1);
    console.log(`QuizNo:${sheetAccessor.getQuizNo()}`);
    console.log("currentQuiz:", quiz.current());

    // 値指定
    sheetAccessor.setQuizNo(3);
    console.log(`QuizNo:${sheetAccessor.getQuizNo()}`);
    console.log("currentQuiz:", quiz.current());

    sheetAccessor.setQuizNo(beforeQuizNo);
}

function TestQuiz_Find() {
    console.log("findQuiz:", quiz.find(2));
}

function TestAnswer() {
    console.log("beforeQuiz:", quiz.find(1));
    quiz.Start();
    quiz.Answer('✕');
    console.log("AfterQuiz:", quiz.find(1));
}

function TestQuizFlow() {
    sheetAccessor.setStatus(State.Finish);
    sheetAccessor.setQuizNo(0);
    let isStart = false;
    let anserindex = 0;
    const answerlist = ['〇', 'Row', 'ウスヒラタケ', '札幌'];

    while (true) {
        const BeforeStatus = sheetAccessor.getStatus();
        const BeforeQuizNo = sheetAccessor.getQuizNo();

        if (!isStart) {
            quiz.Start();
            console.log("currentQuiz:", quiz.find(1));

            isStart = true;
        } else {
            quiz.Answer(answerlist[anserindex++]);
            quiz.Question();
            console.log("currentQuiz:", quiz.current());
        }

        console.log(`Status:${BeforeStatus} -> ${sheetAccessor.getStatus()}`);
        console.log(`QuizNo:${BeforeQuizNo} -> ${sheetAccessor.getQuizNo()}`);

        const quizitem = quiz.current();
        if (quizitem === null && sheetAccessor.getStatus() === State.Finish)
            break;
    }
}