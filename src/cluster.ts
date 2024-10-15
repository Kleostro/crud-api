import dotenv from "dotenv";
import http from "http";
import { cpus } from "os";
import cluster from "cluster";
import path from "path";
import UserService from "./services/UserService";
import UserController from "./controllers/UserController";
import createApp from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const numCPUs = cpus().length;

const createProxyRequest = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  port: number
) => {
  const proxyReq = http.request(
    {
      hostname: "localhost",
      port,
      path: request.url,
      method: request.method,
      headers: request.headers,
    },
    (proxyRes) => {
      response.writeHead(proxyRes.statusCode!, proxyRes.headers);
      proxyRes.pipe(response);
    }
  );
  request.pipe(proxyReq);
};

if (cluster.isPrimary) {
  console.log(`Master process started. Number of CPU cores: ${numCPUs}`);

  const dataFilePath = path.join(process.cwd(), "users.json");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT + i + 1, DATA_FILE: dataFilePath });
  }

  cluster.on("exit", (worker, code) => {
    if (code !== 0) {
      console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
      cluster.fork({ PORT: PORT + worker.id });
    }
  });

  let currentWorkerPort = PORT + 1;
  http
    .createServer((req, res) => {
      createProxyRequest(req, res, currentWorkerPort);
      currentWorkerPort =
        currentWorkerPort < PORT + numCPUs ? currentWorkerPort + 1 : PORT + 1;
    })
    .listen(PORT, () => {
      console.log(`Main server listening on port ${PORT}`);
    });
} else {
  const workerPort = Number(process.env.PORT);
  const dataFilePath = process.env.DATA_FILE;

  if (!dataFilePath) {
    console.error("DATA_FILE environment variable is not set");
    process.exit(1);
  }

  const userService = new UserService();
  const userController = new UserController(userService);
  const app = createApp(userController);

  http.createServer(app).listen(workerPort, () => {
    console.log(
      `Worker ${cluster.worker!.id} started. Listening on port ${workerPort}`
    );
  });
}
