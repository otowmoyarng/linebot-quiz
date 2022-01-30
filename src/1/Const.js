const State = {
    Answering: '回答中',
    Finish: '回答終了',
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
function getCurrentTime() {
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