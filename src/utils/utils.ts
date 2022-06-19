import {ServerResponse} from "http";
import User from "../entity/User";

const contentTypeJson = {'Content-Type': 'application/json'};

export function sendJsonResponse(
    res: ServerResponse,
    {code, message}: { code: number, message: string|User }
) {
    res.writeHead(code, contentTypeJson)
    res.end(JSON.stringify(message));
}
