import { Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.get("/", userController.getUsers.bind(userController));

export default userRouter;
