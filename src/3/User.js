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