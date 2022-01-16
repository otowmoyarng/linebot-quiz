function TestGetToken() {
    console.log(`CHANNEL_ACCESS_TOKEN:${LineApiDriver.GetToken()}`);
}

function TestSendBroadcast() {
    const messsage = 'これは送信テストです';
    LineApiDriver.SendBroadcast(messsage);
}