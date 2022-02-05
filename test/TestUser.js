function TestUsers_add() {
    user.Add(GetTestUserId());
    console.log("getAllUsers:", sheetAccessor.GetAllUsers());
    user.Add(GetTestUserId());
    console.log("getAllUsers:", sheetAccessor.GetAllUsers());
}

function TestUsers_remove() {
    user.Add(GetTestUserId());
    user.Remove(GetTestUserId());
    console.log("getAllUsers:", sheetAccessor.GetAllUsers());
}

function TestUsers_find() {
    console.log("hit:", user.find(GetTestUserId()));
    console.log("not hit:", user.find("hoge"));
}