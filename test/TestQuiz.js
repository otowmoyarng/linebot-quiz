function TestQuiz_GetAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function TestQuiz_Current() {
    const beforeQuizNo = sheetAccessor.GetQuizNo(GetTestUserId());

    sheetAccessor.SetQuizNo(GetTestUserId(), 1);
    console.log(`QuizNo:${sheetAccessor.GetQuizNo(GetTestUserId())}`);
    console.log("currentQuiz:", quiz.current(GetTestUserId()));

    sheetAccessor.SetQuizNo(GetTestUserId(), 3);
    console.log(`QuizNo:${sheetAccessor.GetQuizNo(GetTestUserId())}`);
    console.log("currentQuiz:", quiz.current(GetTestUserId()));

    sheetAccessor.SetQuizNo(GetTestUserId(), beforeQuizNo);
}

function TestQuiz_Find() {
    console.log("findQuiz:", quiz.find(2));
}

function TestAnswer() {
    const quizCount = sheetAccessor.GetAllQuizzes().length;
    const answerList = ['A', '@', '1', 'z'];

    sheetAccessor.SetQuizNo(GetTestUserId(), 1);
    let quizNo = sheetAccessor.GetQuizNo(GetTestUserId());

    while (quizNo <= quizCount) {
        quiz.Answer(answerList[quizNo - 1], GetTestUserId());
        console.log(`Answer No${quizNo}`, sheetAccessor.GetUser(GetTestUserId()));

        sheetAccessor.CountUpQuizNo(GetTestUserId());
        quizNo = sheetAccessor.GetQuizNo(GetTestUserId());
    }
}