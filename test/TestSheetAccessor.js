function SheetAccessorTest_Config() {
    const keys = ['Token', 'URL'];
    keys.forEach(key => {
        const value = Sheet.Config.getRange(key).getValue();
        console.log(`${key}:`, value);
    });
}

function SheetAccessorTest_GetAllUsers() {
    console.log("getAllUsers:", sheetAccessor.GetAllUsers());
}

function SheetAccessorTest_Status() {
    const statusList = [State.Answering, State.Finish, State.Waiting];
    statusList.forEach(status => {
        sheetAccessor.SetStatus(GetTestUserId(), status);
        console.log("setStatus:", sheetAccessor.GetStatus(GetTestUserId()));
    });
}

function SheetAccessorTest_QuizNoAllTest() {
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

function SheetAccessorTest_ClearAnswer() {
    console.log("before:", sheetAccessor.GetUser(GetTestUserId()));
    sheetAccessor.ClearAnswer(GetTestUserId());
    console.log("after:", sheetAccessor.GetUser(GetTestUserId()));
}