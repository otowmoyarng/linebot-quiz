class User {
    add(userId) {
        const user = this.find(userId);
        if (user != null) {
            // 既に登録済み
            return;
        }

        // 新規アクセス
        const userName = LineApiDriver.getUserDisplayName(userId);
        sheetAccessor.addUser(userId, userName, getCurrentTime(), NickNameStatus.None);

        return;
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

            sheetAccessor.removeUser(user.rowId)
            lock.releaseLock();
        }
    }

    // setNickName(userId, nickName) {
    //     const user = this.get(userId);
    //     sheetAccessor.setUserNickName(user.rowId, nickName);
    // }

    // get(userId) {
    //     const users = this.getAll();

    //     // 該当ユーザー情報を取得
    //     return users.find((user) => {
    //         return user.id === userId;
    //     });
    // }

    getAll() {
        const userValues = sheetAccessor.getAllUsers();
        const users = userValues.map((row, index) => {
            return { id: row[0], displayName: row[1], date: row[2], nickName: row[3], rowId: index + 1 };
        });

        return users;
    }

    find(userId) {
        const users = this.getAll();

        const index = users.findIndex((user) => {
            return user.id === userId;
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