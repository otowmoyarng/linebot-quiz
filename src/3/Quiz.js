class Quiz {

    /**
     * クイズを始める
     * @param replyToken リプライトークン
     * @param userId ユーザーID
     */
    Start(replyToken, userId) {
        // ステータスを回答中とする
        sheetAccessor.SetStatus(userId, State.Answering);
        // 問題数と回答を初期化する
        sheetAccessor.SetQuizNo(userId);
        return this.Question(replyToken, userId);
    }

    /**
     * 出題する
     * @param replyToken リプライトークン
     * @param userId ユーザーID
     */
    Question(replyToken, userId) {
        // 問題数をカウントアップする
        sheetAccessor.CountUpQuizNo(userId);

        const quizItem = this.current(userId);

        if (quizItem === null) {
            // ステータスを回答終了とする
            sheetAccessor.SetStatus(userId, State.Finish);
            // 結果発表
            return LineApiDriver.ReplyButtonMessage(replyToken, '結果発表', null, this.score(userId), `${Operation.Again},${Operation.Scoring}`);
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
     * @param userId ユーザーID
     */
    Answer(text, userId) {
        sheetAccessor.SetAnswer(userId, text);
    }

    /**
     * 採点する
     * @param userId ユーザーID
     */
    score(userId) {
        const quizList = quiz.getAll();
        const questionCount = quizList.length;
        let correctCount = 0;
        for (let index = 0; index < questionCount; index++) {
            const answer = sheetAccessor.GetAnswer(userId, index + 1);
            if (quizList[index].Correct == answer) {
                correctCount++;
            }
        }
        return `あなたは${questionCount}問中${correctCount}問正解しました。点数は${Math.floor(correctCount / questionCount * 100)}点です。`;
    }

    /**
     * 公開する
     * @param replyToken リプライトークン
     * @param userId ユーザーID
     */
    Expose(replyToken, userId) {
        // const quizes = quiz.getAll();
        // let messages = [];
        // quizes.forEach(quizItem => {
        //     const message = `Q${quizItem.QuizNo}  正解：${quizItem.Correct}、あなたの回答：${quizItem.Answer}`;
        //     // 応答メッセージは最大5件
        //     if (messages.length === 5) {
        //         LineApiDriver.ReplyTextMessage(replyToken, messages);
        //         messages = [];
        //     }
        //     messages.push(message);
        // });

        const quizList = quiz.getAll();
        const questionCount = quizList.length;
        let messages = [];

        for (let index = 0; index < questionCount; index++) {
            const answer = sheetAccessor.GetAnswer(userId, index + 1);
            const message = `Q${quizList[index].QuizNo}  正解：${quizList[index].Correct}、あなたの回答：${answer}`;
            // 応答メッセージは最大5件
            if (messages.length === ReplyMessageSendMaxCount) {
                LineApiDriver.ReplyTextMessage(replyToken, messages);
                messages = [];
            }
            messages.push(message);
        }

        if (messages.length > 0) {
            LineApiDriver.ReplyTextMessage(replyToken, messages);
        }
    }

    getAll() {
        const quizValues = sheetAccessor.GetAllQuizzes();
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

    current(userId) {
        return this.find(sheetAccessor.GetQuizNo(userId));
    }
}

const quiz = new Quiz();