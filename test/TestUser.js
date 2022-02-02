function TestUsers_add() {
    user.add(getUserId());
    console.log("getAllUsers:", user.getAll());
    user.add(getUserId());
    console.log("getAllUsers:", user.getAll());
}

function TestUsers_remove() {
    user.add(getUserId());
    user.remove(getUserId());
    console.log("getAllUsers:", user.getAll());
}

function TestUsers_getAll() {
    console.log("getAll:", user.getAll());
}

function TestUsers_find() {
    console.log("find:", user.find(getUserId()));
}