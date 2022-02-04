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
    console.log("getStatus:", sheetAccessor.getStatus(getUserId()));
}

function TestSetStatus() {
    const statusList = [State.Answering, State.Finish, State.Waiting];
    statusList.forEach(status => {
        sheetAccessor.setStatus(getUserId(), status);
        console.log("setStatus:", sheetAccessor.getStatus(getUserId()));
    });
}

function TestSetCountUpQuizNo() {
    const beforeQuizNo = sheetAccessor.getQuizNo(getUserId());
    sheetAccessor.setQuizNo(getUserId());
    let quizNo = sheetAccessor.getQuizNo(getUserId());
    console.log(`QuizNo:${quizNo}`);
    while (quizNo <= 10) {
        sheetAccessor.countUpQuizNo(getUserId());
        quizNo = sheetAccessor.getQuizNo(getUserId());
        console.log(`QuizNo:${quizNo}`);
    }
    sheetAccessor.setQuizNo(getUserId(), beforeQuizNo);
}