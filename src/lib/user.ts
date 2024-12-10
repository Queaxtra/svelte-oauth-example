import db from "./db";

export async function getUser() {
    const user = db.authStore.model;
    return user;
}

export async function createUser(name: string, email: string, password: string, passwordConfirm: string, emailVisibility: boolean) {
    const user = await db.collection("users").create({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        emailVisibility: emailVisibility
    });

    return user;
}

export async function loginUser(email: string, password: string) {
    const user = await db.collection("users").authWithPassword(email, password);
    return user;
}

export async function logoutUser() {
    db.authStore.clear();
}

export async function deleteUser(id: string) {
    const user = await db.collection("users").delete(id);
    return user;
}

export async function isValidUser() {
    return db.authStore.isValid;
}