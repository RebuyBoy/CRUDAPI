import {IncomingMessage, ServerResponse} from "http";
import {validate} from "uuid";
import userController from "./controllers/UserControllerImpl";
import {sendJsonResponse} from "./utils/utils";

const userRequestRegex = /^\/api\/users\/?(?<uuid>[a-f\d-]{36})?$/

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
    const url = req.url;
    const matchResult = url.match(userRequestRegex);
    if (validRequest(res, matchResult)) {
        const uuid = matchResult.groups.uuid;
        const method = req.method;
        if (method === "GET") {
            handleGetRequest(req, res, uuid);
        }
        if (method === "POST") {
            handlePostRequest(req, res);
        }
        if (method === "PUT") {
            handlePutRequest(req, res, uuid);
        }
        if (method === "DELETE") {
            handleDeleteRequest(req, res, uuid);
        }
    }
}

function handleGetRequest(req: IncomingMessage, res: ServerResponse, uuid) {
    uuid ?
        userController.getById(req, res, uuid)
        : userController.getAll(req, res);
}

function handlePostRequest(req: IncomingMessage, res: ServerResponse) {
    userController.save(req, res);
}

function handlePutRequest(req: IncomingMessage, res: ServerResponse, uuid: any) {
    userController.update(req, res, uuid);
}

function handleDeleteRequest(req: IncomingMessage, res: ServerResponse, uuid: any) {
    userController.remove(req, res, uuid);
}

function validRequest(res: ServerResponse, matchResult: RegExpMatchArray) {
    if (!matchResult) {
        sendJsonResponse(res, {code: 404, message: "Page not found"});
        return false;
    }
    const uuid = matchResult.groups.uuid;
    if (uuid && !validate(uuid)) {
        sendJsonResponse(res, {code: 400, message: "Uuid is invalid"});
        return false;
    }
    return true;
}