import { Request, Response } from "express";
import UserService from "../services/UserService";
import { validate } from "uuid";
import User from "../models/User";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers(req: Request, res: Response) {
    const users = this.userService.getUsers();
    res.status(200).json(users);
  }

  getUserById(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = this.userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  createUser(req: Request, res: Response) {
    const { username, age, hobbies } = req.body;

    if (
      typeof username !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies) ||
      hobbies.some((hobby) => typeof hobby !== "string")
    ) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const newUser = this.userService.createUser({ username, age, hobbies });
    res.status(201).json(newUser);
  }
}

export default UserController;
