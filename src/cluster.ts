import cluster from "cluster";
import os from "os";
import {pid} from "process";
import {startServer} from "./crudApp";


if (cluster.isPrimary) {
    const count = os.cpus().length;
    console.log(`Master pid: ${pid}`);
    console.log(`Starting ${count - 1} forks`);
    for (let i = 0; i < count - 1; i++) {
        const worker = cluster.fork();
        // worker.on("exit", (err) => {
        //     console.log("worker dead", err);
        //     // cluster.fork();
        // })
    }
} else {
    const id = cluster.worker.id;
    console.log(`Worker: ${id}, pid: ${pid}`);
    startServer();
}
// process.on("message",(message)=>{
//     console.log(message);
// })



// Кстати, вопрос на засыпку: а вы же понимаете, что для того, чтобы реализовать горизонтальное скалирование,
// мало просто поднять несколько инстансов при помощи кластера, т.к. при этом у каждого инстанса будет своя in-memory DB?
//
// There could be implemented horizontal scaling for application (there is a npm script start:multi that starts multiple instances of your application
// using the Node.js Cluster API (equal to the number of logical processor cores on the host machine)
// with a load balancer that distributes requests across them)