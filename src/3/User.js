class User {

    /**
     * ユーザー追加
     * @param userId ユーザーID
     */
    add(userId) {
        const user = this.find(userId);
        // 既に登録済み
        if (user !== null) {
            return;
        }

        sheetAccessor.addUser(userId);
    }

    /**
     * ユーザー削除
     * @param userId ユーザーID
     */
    remove(userId) {
        const lock = LockService.getDocumentLock();
        if (lock.tryLock(1000)) {
            const user = this.find(userId);
            if (user === null) {
                lock.releaseLock();
                // 該当ユーザーなし
                return;
            }

            sheetAccessor.removeUser(userId)
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
            UserId: result[0][0],
            State: result[0][1],
            CurrentQuizNo: result[0][2],
        };

        const quizCount = sheetAccessor.getAllQuizzes().length;
        let answerIndex = 0;
        while (answerIndex < quizCount) {
            answerIndex++;
            userData[`Answer${answerIndex}`] = result[0][answerIndex + 2];
        }
        return userData;
    }
}

const user = new User();

/**
 * フォロー時の処理
 */
function follow(userId) {
    return user.add(userId);
}

/**
 * フォロー解除時の処理
 */
function unfollow(userId) {
    return user.remove(userId);
}