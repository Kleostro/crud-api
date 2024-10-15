import express from "express";
import userRouter from "./routes/userRouter";
import { errorHandler, notFoundHandler } from "./core/errors/errorHandler";
import UserController from "./controllers/UserController";

const createApp = (userController: UserController) => {
  const app = express();
  app.use(express.json());
  app.use("/api/users", userRouter(userController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
