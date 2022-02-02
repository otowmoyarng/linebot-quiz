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
    console.log("getStatus:", sheetAccessor.getStatus());
}

function TestSetStatus() {
    sheetAccessor.setStatus("test");
    console.log("setStatus:", sheetAccessor.getStatus());
}

function TestSetCountUpQuizNo() {
    const beforeQuizNo = sheetAccessor.getQuizNo();
    sheetAccessor.setQuizNo();
    let quizNo = sheetAccessor.getQuizNo();
    console.log(`QuizNo:${quizNo}`);
    while (quizNo <= 10) {
        sheetAccessor.countUpQuizNo();
        quizNo = sheetAccessor.getQuizNo();
        console.log(`QuizNo:${quizNo}`);
    }
    sheetAccessor.setQuizNo(beforeQuizNo);
}