class Logs {
    WriteLog(message) {
        // 現在日時はUTC時間から日本時間へ変更する
        const dateformated = (dateitem) => {
            return (dateitem < 10 ? '0' : '') + dateitem;
        }
        const now = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000);
        const nowstr = now.getFullYear() + '/' +
            dateformated(now.getMonth() + 1) + '/' +
            dateformated(now.getDate()) + ' ' +
            dateformated(now.getHours()) + ':' +
            dateformated(now.getMinutes()) + ':' +
            dateformated(now.getSeconds());
        Sheet.Logs.appendRow([nowstr, message]);
    }
}

const Logger = new Logs();