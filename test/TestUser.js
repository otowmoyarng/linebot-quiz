function TestUsers_add() {
    user.add(getUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
    user.add(getUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
}

function TestUsers_remove() {
    user.add(getUserId());
    user.remove(getUserId());
    console.log("getAllUsers:", sheetAccessor.getAllUsers());
}

// function TestUsers_getAll() {
//     console.log("getAll:", user.getAll());
// }

function TestUsers_find() {
    console.log("hit:", user.find(getUserId()));
    console.log("not hit:", user.find("hoge"));
}