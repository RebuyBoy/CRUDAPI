import cluster from "cluster";
import os from "os";
import "dotenv/config";

if (cluster.isPrimary) {
    const count = os.cpus().length;
    for (let i = 0; i < count; i++) {
        cluster.fork();
    }
} else {
    import('./application')
}
