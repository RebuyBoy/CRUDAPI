import User from "../entity/User";

export default interface UserStorage {

    save(newUser: User);

    delete(id: string);

    getAll();

    getById(id: string);

    update(user: User);

}

