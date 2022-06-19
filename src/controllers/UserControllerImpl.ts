import userStorage from "../storage/UserStorageImpl";
import {sendJsonResponse} from "../utils/utils";
import User from "../entity/User";
import UserController from "./UserController";
import {IncomingMessage, ServerResponse} from "http";

class UserControllerImpl implements UserController {

    getAll(req: IncomingMessage, res: ServerResponse) {
        const users = userStorage.getAll();
        sendJsonResponse(res, {code: 200, message: users})
    }

    getById(req: IncomingMessage, res: ServerResponse, id: string) {
        try {
            const user = userStorage.getById(id)
            sendJsonResponse(res, {code: 200, message: user})
        } catch (err) {
            sendJsonResponse(res, {code: 404, message: "User Not Found"});
        }
    }

    async save(req: IncomingMessage, res: ServerResponse) {
        const data = await this.getRequestBodyData(req);
        if (typeof data === "string") {
            const jsonData = JSON.parse(data);
            if (!this.validData(jsonData)) {
                sendJsonResponse(res, {code: 400, message: "Request body does not contain required fields"});
            } else {
                const {username, age, hobbies} = jsonData;
                const newUser = new User(username, age, hobbies);
                userStorage.save(newUser);
                sendJsonResponse(res, {code: 201, message: newUser});
            }
        }
    }

    async update(req, res, id) {
        const data = await this.getRequestBodyData(req);
        if (typeof data === "string") {
            const jsonData = JSON.parse(data);
            if (!this.validUpdateData(jsonData)) {
                sendJsonResponse(res, {code: 400, message: "Request body does not contain fields to update"});
            } else {
                const {username, age, hobbies} = jsonData;
                const userWithNewFields = new User(username, age, hobbies,id);
                const updatedUser = userStorage.update(userWithNewFields);
                sendJsonResponse(res, {code: 201, message: updatedUser});
            }
        }
    }

    remove(req: IncomingMessage, res: ServerResponse, id: string) {
        try {
            userStorage.delete(id);
            sendJsonResponse(res, {code: 204, message: ""})
        } catch (err) {
            sendJsonResponse(res, {code: 404, message: ""})
        }
    }

    getRequestBodyData(req: IncomingMessage) {
        const chunks = [];
        return new Promise((resolve, reject) => {
            req.on("data", (chunk) => chunks.push(chunk));
            req.on("error", (err) => reject(err));
            req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
    }

    validData({username, age, hobbies}: { username: string, age: number, hobbies: string[] }) {
        return username && age && hobbies;
    }
    validUpdateData({username, age, hobbies}: { username: string, age: number, hobbies: string[] }) {
        return username || age || hobbies;
    }
}

const userController: UserController = new UserControllerImpl();
export default userController;