import cluster from "cluster";
import os from "os";
import {pid} from "process";
import {startServer} from "./application";
import "dotenv/config";
import {resolve} from "path";


if (cluster.isPrimary) {
    const count = os.cpus().length;
    console.log(`Master pid: ${pid}`);
    for (let i = 0; i < count - 1; i++) {
        const worker = cluster.fork();
        // worker.on("exit", (err) => {
        //     console.log("worker dead", err);
        //     // cluster.fork();
        // })
    }
} else {
    const id = cluster.worker.id;
    startServer();
}
// process.on("message",(message)=>{
//     console.log(message);
// })

function getPort(): string {
    const path = resolve(process.cwd(), ".env");
    console.log(path);
    return process.env.PORT || "3000"
}

// Кстати, вопрос на засыпку: а вы же понимаете, что для того, чтобы реализовать горизонтальное скалирование,
// мало просто поднять несколько инстансов при помощи кластера, т.к. при этом у каждого инстанса будет своя in-memory DB?
//
// There could be implemented horizontal scaling for application (there is a npm script start:multi that starts multiple instances of your application
// using the Node.js Cluster API (equal to the number of logical processor cores on the host machine)
// with a load balancer that distributes requests across them)