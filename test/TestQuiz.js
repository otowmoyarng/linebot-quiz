function TestQuiz_GetAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function TestQuiz_Current() {
    const beforeQuizNo = sheetAccessor.getQuizNo(getTestUserId());

    // デフォルト値
    sheetAccessor.setQuizNo(getTestUserId(), 1);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getTestUserId())}`);
    console.log("currentQuiz:", quiz.current(getTestUserId()));

    // 値指定
    sheetAccessor.setQuizNo(getTestUserId(), 3);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getTestUserId())}`);
    console.log("currentQuiz:", quiz.current(getTestUserId()));

    sheetAccessor.setQuizNo(getTestUserId(), beforeQuizNo);
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
    sheetAccessor.setStatus(getTestUserId(), State.Finish);
    sheetAccessor.setQuizNo(getTestUserId(), 0);
    let isStart = false;
    let anserindex = 0;
    const answerlist = ['〇', 'Row', 'ウスヒラタケ', '札幌'];

    while (true) {
        const BeforeStatus = sheetAccessor.getStatus(getTestUserId());
        const BeforeQuizNo = sheetAccessor.getQuizNo(getTestUserId());

        if (!isStart) {
            quiz.Start();
            console.log("currentQuiz:", quiz.find(1));

            isStart = true;
        } else {
            quiz.Answer(answerlist[anserindex++]);
            quiz.Question();
            console.log("currentQuiz:", quiz.current());
        }

        console.log(`Status:${BeforeStatus} -> ${sheetAccessor.getStatus(getTestUserId())}`);
        console.log(`QuizNo:${BeforeQuizNo} -> ${sheetAccessor.getQuizNo(getTestUserId())}`);

        const quizitem = quiz.current();
        if (quizitem === null && sheetAccessor.getStatus(getTestUserId()) === State.Finish)
            break;
    }
}