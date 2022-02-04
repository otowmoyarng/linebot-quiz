function TestQuiz_GetAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function TestQuiz_Current() {
    const beforeQuizNo = sheetAccessor.getQuizNo(getUserId());

    // デフォルト値
    sheetAccessor.setQuizNo(getUserId(), 1);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getUserId())}`);
    console.log("currentQuiz:", quiz.current());

    // 値指定
    sheetAccessor.setQuizNo(getUserId(), 3);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getUserId())}`);
    console.log("currentQuiz:", quiz.current());

    sheetAccessor.setQuizNo(getUserId(), beforeQuizNo);
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
    sheetAccessor.setStatus(getUserId(), State.Finish);
    sheetAccessor.setQuizNo(getUserId(), 0);
    let isStart = false;
    let anserindex = 0;
    const answerlist = ['〇', 'Row', 'ウスヒラタケ', '札幌'];

    while (true) {
        const BeforeStatus = sheetAccessor.getStatus(getUserId());
        const BeforeQuizNo = sheetAccessor.getQuizNo(getUserId());

        if (!isStart) {
            quiz.Start();
            console.log("currentQuiz:", quiz.find(1));

            isStart = true;
        } else {
            quiz.Answer(answerlist[anserindex++]);
            quiz.Question();
            console.log("currentQuiz:", quiz.current());
        }

        console.log(`Status:${BeforeStatus} -> ${sheetAccessor.getStatus(getUserId())}`);
        console.log(`QuizNo:${BeforeQuizNo} -> ${sheetAccessor.getQuizNo(getUserId())}`);

        const quizitem = quiz.current();
        if (quizitem === null && sheetAccessor.getStatus(getUserId()) === State.Finish)
            break;
    }
}