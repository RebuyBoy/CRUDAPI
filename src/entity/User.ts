// Users are stored as objects that have following properties:
//     id — unique identifier (string, uuid) generated on server side
// username — user's name (string, required)
// age — user's age (number, required)
// hobbies — user's hobbies (array of strings or empty array, required)
import { randomUUID } from 'crypto'

export default class User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(username: string, age: number, hobbies: string[]) {
        this.id = randomUUID();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
    //TODO overload constructors ?
    //TODO private fields ?

}
