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

    // /**
    //  * ユーザー全件取得
    //  * @returns 全ユーザー
    //  */
    // getAll() {
    //     const quizCount = sheetAccessor.getAllQuizzes().length;
    //     const allUsers = sheetAccessor.getAllUsers();
    //     let users = [];
    //     allUsers.forEach((row, index) => {
    //         // 先頭行を除く
    //         if (index > 0) {
    //             let userData = {
    //                 UserId: row[0],
    //                 State: row[1],
    //                 //DelFlg: row[2],
    //                 CurrentQuizNo: row[2],
    //                 rowId: index + 1
    //             };

    //             let answerIndex = 0;
    //             while (answerIndex < quizCount) {
    //                 answerIndex++;
    //                 userData[`Answer${answerIndex}`] = row[answerIndex + 2];
    //             }
    //             users.push(userData);
    //         }
    //     });
    //     return users;
    // }

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