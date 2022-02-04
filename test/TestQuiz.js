function TestQuiz_GetAll() {
    console.log("getAllQuizzes:", quiz.getAll());
}

function TestQuiz_Current() {
    const beforeQuizNo = sheetAccessor.getQuizNo(getTestUserId());

    sheetAccessor.setQuizNo(getTestUserId(), 1);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getTestUserId())}`);
    console.log("currentQuiz:", quiz.current(getTestUserId()));

    sheetAccessor.setQuizNo(getTestUserId(), 3);
    console.log(`QuizNo:${sheetAccessor.getQuizNo(getTestUserId())}`);
    console.log("currentQuiz:", quiz.current(getTestUserId()));

    sheetAccessor.setQuizNo(getTestUserId(), beforeQuizNo);
}

function TestQuiz_Find() {
    console.log("findQuiz:", quiz.find(2));
}

function TestAnswer() {
    const quizCount = sheetAccessor.getAllQuizzes().length;
    const answerList = ['A', '@', '1', 'z'];

    sheetAccessor.setQuizNo(getTestUserId(), 1);
    let quizNo = sheetAccessor.getQuizNo(getTestUserId());

    while (quizNo <= quizCount) {
        quiz.Answer(answerList[quizNo - 1], getTestUserId());
        console.log(`Answer No${quizNo}`, sheetAccessor.GetUser(getTestUserId()));

        sheetAccessor.countUpQuizNo(getTestUserId());
        quizNo = sheetAccessor.getQuizNo(getTestUserId());
    }
}