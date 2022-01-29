const State = {
    Answering: '回答中',
    Finish: '回答終了',
};

const Operation = {
    // Questioner: '出題者',
    Start: '開始',
    // SetParticipantNum: '参加人数確定',
    // Entry: '募集',
    // EntryDone: '募集終了',
    // OnAir: 'ON AIR',
    // OnAirWaiting: 'ON AIR(Waiting)',
    // OnAirDone: 'ON AIR(Done)',
    // Question: '出題',
    // Open: 'オープン',
    // Next: '次の問題',
};

const NickNameStatus = {
    None: `none`,
    Setting: `setting`
}

const QuestionType = {
    Confirm: `確認`,
    Button: `ボタン`
}

const ReplyMessages = {
    replyToken: '', // リプライトークン
    messages: []    // 送信メッセージ配列
}

const ConfirmTempleteMessage = {
    type: 'template',   // template固定
    altText: 'altText', // 代替テキスト
    template: {
        type: 'confirm',            // button固定
        text: '',                   // メッセージテキスト
        actions: []                 // タップされたときのアクション
    }
}

const ButtonTempleteMessage = {
    type: 'template',   // template固定
    altText: 'altText', // 代替テキスト
    template: {
        type: 'buttons',            // button固定
        thumbnailImageUrl: '',      // 画像URL
        imageAspectRatio: '',       // 画像のアスペクト rectangle/square
        imageSize: '',              // 画像の表示形式   cover/contain
        imageBackgroundColor: '',   // 画像の背景色 HTTPカラーコード
        title: '',                  // タイトル
        text: '',                   // メッセージテキスト
        actions: []                 // タップされたときのアクション
    }
}

const MessageAction = {
    type: 'message',    // message
    label: '',          // ラベル
    text: ''            // アクションの実行時に送信されるテキスト
}

const PostBackAction = {
    type: 'postback',   // postback固定
    label: '',          // ラベル
    data: '',           // postback.dataプロパティで返される文字列
    displayText: ''     // アクションの実行時に、ユーザーのメッセージとしてLINEのトーク画面に表示されるテキスト
}

function getCurrentTime() {
    //日付の宣言
    return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
}