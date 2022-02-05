function TestSheet_Config() {
    const keys = ['Token', 'URL'];
    keys.forEach(key => {
        const value = Sheet.Config.getRange(key).getValue();
        console.log(`${key}:`, value);
    });
}

function TestGetAllUsers() {
    console.log("getAllUsers:", sheetAccessor.GetAllUsers());
}

function TestGetStatus() {
    console.log("getStatus:", sheetAccessor.GetStatus(GetTestUserId()));
}

function TestSetStatus() {
    const statusList = [State.Answering, State.Finish, State.Waiting];
    statusList.forEach(status => {
        sheetAccessor.SetStatus(GetTestUserId(), status);
        console.log("setStatus:", sheetAccessor.GetStatus(GetTestUserId()));
    });
}

function TestSetCountUpQuizNo() {
    const beforeQuizNo = sheetAccessor.GetQuizNo(GetTestUserId());
    sheetAccessor.SetQuizNo(GetTestUserId());
    let quizNo = sheetAccessor.GetQuizNo(GetTestUserId());
    console.log(`QuizNo:${quizNo}`);
    while (quizNo < 10) {
        sheetAccessor.CountUpQuizNo(GetTestUserId());
        quizNo = sheetAccessor.GetQuizNo(GetTestUserId());
        console.log(`QuizNo:${quizNo}`);
    }
    sheetAccessor.SetQuizNo(GetTestUserId(), beforeQuizNo);
}