const State = {
    Waiting: '待機中',
    Answering: '回答中',
    Finish: '回答終了',
};

const DelFlg = {
    NotDelete: '',
    Deleted: '削除済',
};

const Operation = {
    Start: '開始',
    Again: 'もう一度',
    Scoring: '答え合わせ',
};

const NickNameStatus = {
    None: `none`,
    Setting: `setting`
}

const QuestionType = {
    Confirm: `確認`,
    Button: `ボタン`
}

const GASPropertiesKey = {
    UserId: 'LINE_UserId',
}

// クイズのセルの範囲を指定する
const QuizRange = "A16:H19";

//日付の宣言
function GetCurrentTime() {
    return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
}

function IsNullOrEmpty(strings) {
    if (strings === undefined) {
        return true;
    }
    if (strings === null) {
        return true;
    }
    if (strings === '') {
        return true;
    }
    return false;
}

/**
 * プロジェクトのプロパティに登録されたテスト用のユーザーIDを取得する。
 * @returns テスト用ユーザーID
 */
function GetTestUserId() {
    const value = PropertiesService.getScriptProperties().getProperty(GASPropertiesKey.UserId);
    if (value === null) {
        console.error(`key[${key}]がプロパティに存在しません。`);
    }
    return value;
}
