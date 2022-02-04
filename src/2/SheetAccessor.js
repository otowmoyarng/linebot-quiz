const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const Sheet = {
    Config: SpreadSheet.getSheetByName('config'),
    Logs: SpreadSheet.getSheetByName('logs'),
    Quiz: SpreadSheet.getSheetByName('quiz'),
    User: SpreadSheet.getSheetByName('user')
};

class SheetAccessor {

    /**
     * ユーザーを取得する
     * @param userId ユーザーID
     * @returns 該当ユーザー行
     */
    GetUser(userId) {
        const quizCount = this.getAllQuizzes().length;
        const result = Sheet.User.createTextFinder(userId).findAll();
        let userData;
        result.forEach(row => {
            userData = Sheet.User.getRange(row.getRow(), 1, 1, quizCount + 3).getValues();
        });
        return userData;
    }

    /**
     * 該当ユーザーを更新する
     * @param userId ユーザーID
     * @param columnNo カラム
     * @param modifyValue 変更する値
     */
    UpdateUser(userId, columnNo, modifyValue) {
        const result = Sheet.User.createTextFinder(userId).findAll();
        result.forEach(row => {
            Sheet.User.getRange(row.getRow(), columnNo).setValue(modifyValue);
        });
    }

    addUser(userId) {
        const insertRow = [userId, State.Waiting, 0].concat(Array.from({ length: this.getAllQuizzes().length }, () => ''));
        Sheet.User.appendRow(insertRow);
    }

    removeUser(userId) {
        const result = Sheet.User.createTextFinder(userId).findAll();
        result.forEach(row => {
            Sheet.User.deleteRow(row.getRow());
        });
    }

    getAllUsers() {
        return Sheet.User.getDataRange().getValues();
    }

    getStatus(userId) {
        const userData = this.GetUser(userId);
        return userData[0][1];
    }

    setStatus(userId, status = "") {
        this.UpdateUser(userId, 2, status);
    }

    getQuizNo(userId) {
        const userData = this.GetUser(userId);
        return userData[0][2];
    }

    setQuizNo(userId, quizNo = 0) {
        this.UpdateUser(userId, 3, quizNo);
    }

    countUpQuizNo(userId) {
        let currentQuizNo = this.getQuizNo(userId);
        this.UpdateUser(userId, 3, ++currentQuizNo);
    }

    getAllQuizzes() {
        return Sheet.Quiz.getRange(QuizRange).getValues();
    }

    setAnswer(userId, answer) {
        let currentQuizNo = this.getQuizNo(userId);
        this.UpdateUser(userId, 3 + currentQuizNo, answer);
    }
}

const sheetAccessor = new SheetAccessor();