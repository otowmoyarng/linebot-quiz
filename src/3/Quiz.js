class Quiz {

    /**
     * クイズを始める
     * @package replyToken リプライトークン
     */
    Start(replyToken) {
        // ステータスを回答中とする
        sheetAccessor.setStatus(State.Answering);
        // 問題数を初期化する
        sheetAccessor.setQuizNo();
        return this.Question(replyToken);
    }

    /**
     * 出題する
     * @package replyToken リプライトークン
     */
    Question(replyToken) {
        // 問題数をカウントアップする
        sheetAccessor.countUpQuizNo();
        let replyMessage = null;
        const quizitem = this.current();
        if (quizitem === null) {
            // ステータスを回答終了とする
            sheetAccessor.setStatus(State.Finish);
            // 結果発表
            replyMessage = `結果発表`;
        } else {
            // 問題を出す
            replyMessage = `第:${quizitem.QuizNo}門`;
        }
        return replyToken ? LineApiDriver.replyText(/*this.Config.ReplyToken*/replyToken, [replyMessage]) : "replyTokenなし";
    }

    /**
     * 回答をスプレッドシートに記入する
     * @package text 送信テキスト
     */
    Answer(text) {
        sheetAccessor.setAnswer(this.current().Question, text);
    }

    getAll() {
        const quizValues = sheetAccessor.getAllQuizzes();
        const quizzes = quizValues.map((row, index) => {
            return {
                QuizNo: row[0],
                QuizType: row[1],
                Imgsrc: row[2],
                Question: row[3],
                Choices: row[4],
                Correct: row[5],
                Judge: row[6],
                Answer: row[7],
                rowId: index + 1
            };
        });
        return quizzes;
    }

    find(quizNo) {
        const quizzes = this.getAll();

        const index = quizzes.findIndex((quiz) => {
            return quiz.QuizNo === quizNo;
        });

        return index != -1 ? quizzes[index] : null;
    }

    current() {
        return this.find(sheetAccessor.getQuizNo());
    }
}

const quiz = new Quiz();