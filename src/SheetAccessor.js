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

    removeUser(rowId) {
        Sheet.User.deleteRow(rowId);
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

    setStatus(status) {
        Sheet.Quiz.getRange('Status').setValue(status);
    }
}

const sheetAccessor = new SheetAccessor();