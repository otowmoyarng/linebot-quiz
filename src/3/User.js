class User {
    add(userId) {
        const user = this.find(userId);
        // 既に登録済み
        if (user != null) {
            return;
        }

        // 新規アクセス
        //sheetAccessor.addUser(userId, userName, getCurrentTime(), NickNameStatus.None);
        sheetAccessor.addUser(userId);
    }

    remove(userId) {
        const lock = LockService.getDocumentLock();
        if (lock.tryLock(1000)) {
            const user = this.find(userId);
            if (user == null) {
                lock.releaseLock();
                // 該当ユーザーなし
                return;
            }

            sheetAccessor.removeUser(userId)
            lock.releaseLock();
        }
    }

    getAll() {
        const quizCount = sheetAccessor.getAllQuizzes().length;
        const allUsers = sheetAccessor.getAllUsers();
        let users = [];
        allUsers.forEach((row, index) => {
            // 先頭行を除く
            if (index > 0) {
                let userData = {
                    UserId: row[0],
                    State: row[1],
                    DelFlg: row[2],
                    rowId: index + 1
                };

                let answerIndex = 0;
                while (answerIndex < quizCount) {
                    answerIndex++;
                    userData[`Answer${answerIndex}`] = row[answerIndex + 2];
                }
                users.push(userData);
            }
        });
        return users;
    }

    find(searchUserId) {
        const users = this.getAll();

        const index = users.findIndex((user) => {
            return user.UserId === searchUserId;
        });

        return index != -1 ? users[index] : null;
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