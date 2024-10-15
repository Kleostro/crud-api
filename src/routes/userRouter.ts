import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = (userController: UserController) => {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    userController.getUsers(req, res);
  });

  router.get("/:id", (req: Request, res: Response) => {
    userController.getUserById(req, res);
  });

  router.post("/", (req: Request, res: Response) => {
    userController.createUser(req, res);
  });

  router.put("/:id", (req: Request, res: Response) => {
    userController.updateUser(req, res);
  });

  router.delete("/:id", (req: Request, res: Response) => {
    userController.deleteUser(req, res);
  });

  return router;
};

export default userRouter;
