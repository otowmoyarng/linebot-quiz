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
        const quizCount = this.GetAllQuizzes().length;
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
    updateUser(userId, columnNo, modifyValue) {
        const result = Sheet.User.createTextFinder(userId).findAll();
        result.forEach(row => {
            Sheet.User.getRange(row.getRow(), columnNo).setValue(modifyValue);
        });
    }

    AddUser(userId) {
        const insertRow = [userId, State.Waiting, 0].concat(Array.from({ length: this.GetAllQuizzes().length }, () => ''));
        Sheet.User.appendRow(insertRow);
    }

    RemoveUser(userId) {
        const result = Sheet.User.createTextFinder(userId).findAll();
        result.forEach(row => {
            Sheet.User.deleteRow(row.getRow());
        });
    }

    GetAllUsers() {
        return Sheet.User.getDataRange().getValues();
    }

    GetStatus(userId) {
        const userData = this.GetUser(userId);
        return userData[0][1];
    }

    SetStatus(userId, status = "") {
        this.updateUser(userId, 2, status);
    }

    GetQuizNo(userId) {
        const userData = this.GetUser(userId);
        return userData[0][2];
    }

    SetQuizNo(userId, quizNo = 0) {
        this.updateUser(userId, 3, quizNo);
    }

    CountUpQuizNo(userId) {
        let currentQuizNo = this.GetQuizNo(userId);
        this.updateUser(userId, 3, ++currentQuizNo);
    }

    GetAllQuizzes() {
        return Sheet.Quiz.getRange(QuizRange).getValues();
    }

    SetAnswer(userId, answer) {
        let currentQuizNo = this.GetQuizNo(userId);
        this.updateUser(userId, 3 + currentQuizNo, answer);
    }
}

const sheetAccessor = new SheetAccessor();