class Quiz {

    /**
     * クイズを始める
     * @param replyToken リプライトークン
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
     * @param replyToken リプライトークン
     */
    Question(replyToken) {
        // 問題数をカウントアップする
        sheetAccessor.countUpQuizNo();

        const quizItem = this.current();

        let replyMessage = null;
        if (quizItem === null) {
            // ステータスを回答終了とする
            sheetAccessor.setStatus(State.Finish);
            // 結果発表
            return LineApiDriver.ReplyButtonMessage(replyToken, '結果発表', null, this.Score(), `${Operation.Again},${Operation.Scoring}`);
        } else {
            switch (quizItem.QuizType) {
                case QuestionType.Button:
                    LineApiDriver.ReplyButtonMessage(replyToken, `Q${quizItem.QuizNo}`, quizItem.ImgSrc, quizItem.Question, quizItem.Choices);
                case QuestionType.Confirm:
                    return LineApiDriver.ReplyConfirmMessage(replyToken, quizItem.Question, quizItem.Choices);
                default:
                    return LineApiDriver.ReplyTextMessage(replyToken, [`種類が異常値。QuizNo:${quizItem.quizNo}`])
            }
        }
    }

    /**
     * 回答をスプレッドシートに記入する
     * @param text 送信テキスト
     */
    Answer(text) {
        sheetAccessor.setAnswer(this.current().Question, text);
    }

    /**
     * 採点する
     */
    Score() {
        const quizes = quiz.getAll();
        const questionCount = quizes.length;
        const correctCount = quizes.filter(quizItem => quizItem.Judge === 'OK').length;
        return `あなたは${questionCount}問中${correctCount}問正解しました。点数は${Math.floor(correctCount / questionCount * 100)}点です。`;
    }

    /**
     * 公開する
     * @param replyToken リプライトークン
     */
    Expose(replyToken) {
        const quizes = quiz.getAll();
        let messages = [];
        quizes.forEach(quizItem => {
            const message = `Q${quizItem.QuizNo}  正解：${quizItem.Correct}、あなたの回答：${quizItem.Answer}`;
            // 応答メッセージは最大5件
            if (messages.length === 5) {
                LineApiDriver.ReplyTextMessage(replyToken, messages);
                messages = [];
            }
            messages.push(message);
        });

        if (messages.length > 0) {
            LineApiDriver.ReplyTextMessage(replyToken, messages);
        }
    }

    getAll() {
        const quizValues = sheetAccessor.getAllQuizzes();
        const quizzes = quizValues.map((row, index) => {
            return {
                QuizNo: row[0],
                QuizType: row[1],
                ImgSrc: row[2],
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