import {createServer} from "http"
//TODO start server

const server = createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("Hello world\n");
});
const port = 3000

server.listen(port, () => console.log(`server running on port: ${port}`));

