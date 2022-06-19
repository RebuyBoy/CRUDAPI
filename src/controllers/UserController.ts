import {IncomingMessage, ServerResponse} from "http";

export default interface UserController {

    save(req: IncomingMessage, res: ServerResponse);

    remove(req: IncomingMessage, res: ServerResponse, id: string);

    getAll(req: IncomingMessage, res: ServerResponse);

    getById(req: IncomingMessage, res: ServerResponse, id: string);

    update(req: IncomingMessage, res: ServerResponse, id: string);

}