import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.status(200).json(users);
  }
}

export default UserController;
