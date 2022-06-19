import {v4} from "uuid"

export default class User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(username: string, age: number, hobbies: string[], id?: string) {
        this.id = id ? id : v4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
}