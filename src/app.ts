import express from "express";
import userRouter from "./routes/userRouter";
import { errorHandler, notFoundHandler } from "./core/errors/errorHandler";

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
