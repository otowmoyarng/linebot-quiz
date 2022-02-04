function TestSheet_Config() {
    const keys = ['Token', 'URL'];
    keys.forEach(key => {
        const value = Sheet.Config.getRange(key).getValue();
        console.log(`${key}:`, value);
    });
}

function TestGetAllUsers() {
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
}

function TestGetStatus() {
    console.log("getStatus:", sheetAccessor.getStatus(getTestUserId()));
}

function TestSetStatus() {
    const statusList = [State.Answering, State.Finish, State.Waiting];
    statusList.forEach(status => {
        sheetAccessor.setStatus(getTestUserId(), status);
        console.log("setStatus:", sheetAccessor.getStatus(getTestUserId()));
    });
}

function TestSetCountUpQuizNo() {
    const beforeQuizNo = sheetAccessor.getQuizNo(getTestUserId());
    sheetAccessor.setQuizNo(getTestUserId());
    let quizNo = sheetAccessor.getQuizNo(getTestUserId());
    console.log(`QuizNo:${quizNo}`);
    while (quizNo < 10) {
        sheetAccessor.countUpQuizNo(getTestUserId());
        quizNo = sheetAccessor.getQuizNo(getTestUserId());
        console.log(`QuizNo:${quizNo}`);
    }
    sheetAccessor.setQuizNo(getTestUserId(), beforeQuizNo);
}