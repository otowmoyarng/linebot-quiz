function Add() {
    user.Add(GetTestUserId());
    console.log("not exists:", sheetAccessor.GetAllUsers());
    user.Add(GetTestUserId());
    console.log("exists:", sheetAccessor.GetAllUsers());
}

function Remove() {
    user.Add(GetTestUserId());
    user.Remove(GetTestUserId());
    console.log("result:", sheetAccessor.GetAllUsers());
}

function find() {
    console.log("hit:", user.find(GetTestUserId()));
    console.log("not hit:", user.find("hoge"));
}