function QuizTest_Answer() {
    const quizCount = sheetAccessor.GetAllQuizzes().length;
    const answerList = ['〇', 'Row', 'シイタケ', '東京'];

    sheetAccessor.SetQuizNo(GetTestUserId(), 1);
    let quizNo = sheetAccessor.GetQuizNo(GetTestUserId());

    while (quizNo <= quizCount) {
        quiz.Answer(answerList[quizNo - 1], GetTestUserId());
        console.log(`AnswerNo${quizNo}, expect:${answerList[quizNo - 1]}, result:${sheetAccessor.GetAnswer(GetTestUserId(), quizNo)}`);

        sheetAccessor.CountUpQuizNo(GetTestUserId());
        quizNo = sheetAccessor.GetQuizNo(GetTestUserId());
    }
    console.log("Answers:", sheetAccessor.GetUser(GetTestUserId()));
    console.log("score:", quiz.score(GetTestUserId()));
}

function QuizTest_getAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function QuizTest_find() {
    console.log("findQuiz:", quiz.find(2));
}

function QuizTest_current() {
    const beforeQuizNo = sheetAccessor.GetQuizNo(GetTestUserId());

    sheetAccessor.SetQuizNo(GetTestUserId(), 1);
    console.log(`QuizNo:${sheetAccessor.GetQuizNo(GetTestUserId())}`);
    console.log("currentQuiz:", quiz.current(GetTestUserId()));

    sheetAccessor.SetQuizNo(GetTestUserId(), 3);
    console.log(`QuizNo:${sheetAccessor.GetQuizNo(GetTestUserId())}`);
    console.log("currentQuiz:", quiz.current(GetTestUserId()));

    sheetAccessor.SetQuizNo(GetTestUserId(), beforeQuizNo);
}
