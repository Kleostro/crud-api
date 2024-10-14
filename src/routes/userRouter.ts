import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.get("/", (req: Request, res: Response) => {
  userController.getUsers(req, res);
});

userRouter.get("/:id", (req: Request, res: Response) => {
  userController.getUserById(req, res);
});

userRouter.post("/", (req: Request, res: Response) => {
  userController.createUser(req, res);
});

export default userRouter;
