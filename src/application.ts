import {createServer} from "http"
import {handleRequest} from "./usersRequestHandler";
import {sendJsonResponse} from "./utils/utils";
import {pid} from "process";
import "dotenv/config";


export const server = createServer((req, res) => {
    try {
        handleRequest(req, res);
    } catch (err) {
        console.error(err.message);
        sendJsonResponse(res, {code: 500, message: "Something went wrong"})
    }
});

export const startServer = () => {
    const port = process.env.PORT;
    server.listen(port, () => {
        console.log(`server running on port: ${port}`)
        console.log(`process pid: ${pid}`)
    });
}

startServer();


