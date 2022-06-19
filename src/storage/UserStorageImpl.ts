import User from "../entity/User";
import UserStorage from "./UserStorage";
// import cluster from "cluster";

class UserStorageImpl implements UserStorage {
    storage: User[] = [];

    save(newUser: User) {
        const user = this._getById(newUser.id);
        if (user) {
            throw new Error(`User with id: ${newUser.id} already exists`);
        }
        // if (cluster.isWorker) {
        //     cluster.worker.send(["save", newUser])
        // } else {
            this.storage.push(newUser);
        // }
        return newUser;
    }

    delete(id: string) {
        let user = this._getById(id);
        if (!user) {
            throw new Error(`User with id: ${id} does not exists`);
        }
        this.storage = this.storage.filter((user) => user.id !== id);
        return id;
    }

    getAll() {
        return this.storage;
    }

    getById(id: string) {
        const user = this._getById(id);
        if (!user) {
            throw new Error(`User with id: ${id} does not exists`)
        }
        return user;
    }

    update(newUser: User) {
        let user = this._getById(newUser.id);
        if (user) {
            const newUsername = newUser.username;
            const newAge = newUser.age;
            const newHobbies = newUser.hobbies;
            if (newUsername) {
                user.username = newUsername;
            }
            if (newAge) {
                user.age = newAge;
            }
            if (newHobbies) {
                user.hobbies = newHobbies;
            }
            return user;
        }
        throw new Error(`User with id: ${newUser.id} does not exists`)
    }

    _getById(id: String) {
        return this.storage.find((user) => user.id === id);
    }
}

const userStorage: UserStorage = new UserStorageImpl();
export default userStorage;
