const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const Sheet = {
    Config: SpreadSheet.getSheetByName('config'),
    Logs: SpreadSheet.getSheetByName('logs'),
    Quiz: SpreadSheet.getSheetByName('quiz'),
    User: SpreadSheet.getSheetByName('user')
};

// クイズのセルの範囲を指定する
const QuizRange = "A7:H10";

class SheetAccessor {

    addUser(userId, userName, currentTime, nickName) {
        Sheet.User.appendRow([userId, userName, currentTime, nickName]);
    }

    removeUser(userId) {
        Sheet.User.deleteRow(userId);
    }

    // setUserNickName(rowId, nickName) {
    //     Sheet.User.getRange(rowId, UserClmIndex.NickName).setValue(nickName);
    // }

    getAllUsers() {
        return Sheet.User.getDataRange().getValues();
    }

    getStatus() {
        return Sheet.Quiz.getRange('Status').getValue();
    }

    setStatus(status = "") {
        Sheet.Quiz.getRange('Status').setValue(status);
    }

    getQuizNo() {
        return Sheet.Quiz.getRange('QuizNo').getValue();
    }

    setQuizNo(quizNo = 1) {
        Sheet.Quiz.getRange('QuizNo').setValue(quizNo);
    }

    countUpQuizNo() {
        let currentQuizNo = this.getQuizNo();
        Sheet.Quiz.getRange('QuizNo').setValue(++currentQuizNo);
    }

    getAllQuizzes() {
        return Sheet.Quiz.getRange(QuizRange).getValues();
    }
}

const sheetAccessor = new SheetAccessor();