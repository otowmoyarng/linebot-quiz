class Quiz {

    Start(replyToken) {
        // ステータスを回答中とする
        sheetAccessor.setStatus(State.Answering);
        // 問題数を初期化する
        sheetAccessor.setQuizNo();
        return this.Question(replyToken);
    }

    Question(replyToken) {
        const quizitem = this.current();

        let replyMessage = null;
        // 最終問題
        if (quizitem === null) {
            // ステータスを回答終了とする
            sheetAccessor.setStatus(State.Finish);
            // 結果発表
            replyMessage = `結果発表`;
        } else {
            // 問題を出す
            replyMessage = `第:${quizitem.QuizNo}門`;
            // 問題数をカウントアップする
            sheetAccessor.countUpQuizNo();
        }
        return replyToken ? LineApiDriver.replyToUser(/*this.Config.ReplyToken*/replyToken, [replyMessage]) : "replyTokenなし";
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