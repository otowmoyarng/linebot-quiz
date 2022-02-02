const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const Sheet = {
    Config: SpreadSheet.getSheetByName('config'),
    Logs: SpreadSheet.getSheetByName('logs'),
    Quiz: SpreadSheet.getSheetByName('quiz'),
    User: SpreadSheet.getSheetByName('user')
};

class SheetAccessor {

    addUser(userId) {
        const insertRow = [userId, State.Waiting, DelFlg.NotDelete].concat(Array.from({ length: this.getAllQuizzes().length }, () => ''));
        Sheet.User.appendRow(insertRow);
    }

    removeUser(userId) {
        const result = Sheet.User.createTextFinder(userId).findAll();
        result.forEach(row => {
            Sheet.User.getRange(row.getRow(), 3).setValue(DelFlg.Deleted);
        });
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