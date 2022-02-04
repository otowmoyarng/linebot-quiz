function TestUsers_add() {
    user.add(getTestUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
    user.add(getTestUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
}

function TestUsers_remove() {
    user.add(getTestUserId());
    user.remove(getTestUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
}

function TestUsers_find() {
    console.log("hit:", user.find(getTestUserId()));
    console.log("not hit:", user.find("hoge"));
}