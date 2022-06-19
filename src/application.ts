import {createServer} from "http"
import {handleRequest} from "./usersRequestHandler";
import {sendJsonResponse} from "./utils/utils";
import {pid} from "process";
import "dotenv/config";

//TODO +10 The repository with the application contains a Readme.md file containing detailed instructions
// for installing, running and using the application
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


