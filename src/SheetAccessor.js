const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const Sheet = {
    Config: SpreadSheet.getSheetByName('config'),
    Logs: SpreadSheet.getSheetByName('logs')
};

class SheetAccessor {

    // GetConfigSheet() {
    //     return sheet.getSheetByName('config');
    // }

    // GetLogsSheet() {
    //     return sheet.getSheetByName('logs');
    // }
}

const sheetAccessor = new SheetAccessor();