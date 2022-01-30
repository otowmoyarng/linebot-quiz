const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const Sheet = {
    Config: SpreadSheet.getSheetByName('config'),
    Logs: SpreadSheet.getSheetByName('logs'),
    Quiz: SpreadSheet.getSheetByName('quiz'),
    User: SpreadSheet.getSheetByName('user')
};

class SheetAccessor {

    addUser(userId, userName, currentTime, nickName) {
        Sheet.User.appendRow([userId, userName, currentTime, nickName]);
    }

    removeUser(userId) {
        Sheet.User.deleteRow(userId);
    }

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

    setQuizNo(quizNo = 0) {
        Sheet.Quiz.getRange('QuizNo').setValue(quizNo);
    }

    countUpQuizNo() {
        let currentQuizNo = this.getQuizNo();
        Sheet.Quiz.getRange('QuizNo').setValue(++currentQuizNo);
    }

    getAllQuizzes() {
        return Sheet.Quiz.getRange(QuizRange).getValues();
    }

    setAnswer(question, answer) {
        const result = Sheet.Quiz.createTextFinder(question).findAll();
        result.forEach(row => {
            var updcell = row.getA1Notation().replace("D", "H");
            Sheet.Quiz.getRange(`${updcell}`).setValue(answer);
        });
    }
}

const sheetAccessor = new SheetAccessor();