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
        Sheet.User.deleteRow(userId);
        //this.UpdateUser(userId, 3, DelFlg.Deleted);
    }

    getAllUsers() {
        return Sheet.User.getDataRange().getValues();
    }

    getStatus(userId) {
        //return Sheet.Quiz.getRange('Status').getValue();
        const userData = this.GetUser(userId);
        return userData[0][1];
    }

    setStatus(userId, status = "") {
        // Sheet.Quiz.getRange('Status').setValue(status);
        this.UpdateUser(userId, 2, status);
    }

    getQuizNo(userId) {
        //return Sheet.Quiz.getRange('QuizNo').getValue();
        const userData = this.GetUser(userId);
        return userData[0][2];
    }

    setQuizNo(userId, quizNo = 0) {
        //Sheet.Quiz.getRange('QuizNo').setValue(quizNo);
        this.UpdateUser(userId, 3, quizNo);
    }

    countUpQuizNo(userId) {
        let currentQuizNo = this.getQuizNo(userId);
        //Sheet.Quiz.getRange('QuizNo').setValue(++currentQuizNo);
        this.UpdateUser(userId, 3, ++currentQuizNo);
    }

    getAllQuizzes() {
        return Sheet.Quiz.getRange(QuizRange).getValues();
    }

    //setAnswer(question, answer) {
    setAnswer(userId, answer) {
        // const result = Sheet.Quiz.createTextFinder(question).findAll();
        // result.forEach(row => {
        //     var updcell = row.getA1Notation().replace("D", "H");
        //     Sheet.Quiz.getRange(`${updcell}`).setValue(answer);
        // });
        let currentQuizNo = this.getQuizNo(userId);
        this.UpdateUser(userId, 3 + currentQuizNo, answer);
    }
}

const sheetAccessor = new SheetAccessor();