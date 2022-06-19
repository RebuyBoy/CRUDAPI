import {createServer} from "http"
import {handleRequest} from "./usersRequestHandler";
import {sendJsonResponse} from "./utils/utils";
import {pid} from "process";
import {resolve} from "path";
import {config} from "dotenv";


//TODO +10 The repository with the application contains a Readme.md file containing detailed instructions
// for installing, running and using the application
// "start:prod": "tsc && node ./dist/crudApp.js"

export const server = createServer((req, res) => {
    try {
        handleRequest(req, res);
    } catch (err) {
        console.error(err.message);
        sendJsonResponse(res, {code: 500, message: "Something went wrong"})
    }
});

export const startServer = () => {
    const port = getPort();
    server.listen(port, () => {
        console.log(`server running on port: ${port}`)
        console.log(`process pid: ${pid}`)
    });
}

function getPort(): string {
    config();
    return process.env.PORT || "3000"
}

startServer();


