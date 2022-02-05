class User {

    /**
     * ユーザーを追加する
     * @param userId ユーザーID
     */
    Add(userId) {
        const user = this.find(userId);
        // 既に登録済み
        if (user !== null) {
            return;
        }

        sheetAccessor.AddUser(userId);
    }

    /**
     * ユーザーを削除する
     * @param userId ユーザーID
     */
    Remove(userId) {
        const lock = LockService.getDocumentLock();
        if (lock.tryLock(1000)) {
            const user = this.find(userId);
            if (user === null) {
                lock.releaseLock();
                // 該当ユーザーなし
                return;
            }

            sheetAccessor.RemoveUser(userId)
            lock.releaseLock();
        }
    }

    /**
     * ユーザー検索。
     * @param searchUserId ユーザーID
     * @returns 該当ユーザー。見つからなかったらnull
     */
    find(searchUserId) {
        const result = sheetAccessor.GetUser(searchUserId);
        if (result === undefined || result[0] === undefined) {
            return null;
        }

        let userData = {
            UserId: result[0][UserColumnNo.UserId - 1],
            State: result[0][UserColumnNo.State - 1],
            CurrentQuizNo: result[0][UserColumnNo.CurrentQuizNo - 1],
        };

        const quizCount = quiz.GetAll().length;
        let answerIndex = 0;
        while (answerIndex < quizCount) {
            answerIndex++;
            userData[`Answer${answerIndex}`] = result[0][(UserColumnNo.CurrentQuizNo - 1) + answerIndex];
        }
        return userData;
    }
}

const user = new User();