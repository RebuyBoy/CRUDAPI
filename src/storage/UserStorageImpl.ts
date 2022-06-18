import User from "../entity/User.js";
import UserStorage from "./UserStorage";

class UserStorageImpl implements UserStorage {
    storage: User[] = [];
    //TODO map??

    save(newUser: User) {
        if (this._getById(newUser.id)) {
            throw new Error(`User with id: ${newUser.id} already exists`);
        }
        this.storage.push(newUser);
        return newUser;
    }

    delete(id: string) {
        this.storage = this.storage.filter((user) => user.id !== id);
    }

    getAll() {
        return this.storage;
    }

    getById(id: string) {
        return this._getById(id);
    }

    update(newUser: User) {
        let user = this._getById(newUser.id);
        if (user) {
            user.username = newUser.username;
            user.age = newUser.age;
            user.hobbies = newUser.hobbies;
            return user;
        }
        throw new Error(`User with id: ${newUser.id} does not exists`)
    }

    _getById(id: String) {
        return this.storage.find((user) => user.id === id);
    }
}

const userStorage:UserStorage = new UserStorageImpl();
export default userStorage;
