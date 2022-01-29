const State = {
    Answering: '回答中',
    Finish: '回答終了',
};

const Operation = {
    Questioner: '出題者',
    Start: '開始',
    SetParticipantNum: '参加人数確定',
    Entry: '募集',
    EntryDone: '募集終了',
    OnAir: 'ON AIR',
    OnAirWaiting: 'ON AIR(Waiting)',
    OnAirDone: 'ON AIR(Done)',
    Question: '出題',
    Open: 'オープン',
    Next: '次の問題',
};

const NickNameStatus = {
    None: `none`,
    Setting: `setting`
}

function getCurrentTime() {
    //日付の宣言
    return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
}