import { Request, Response } from "express";
import UserService from "../services/UserService";
import { validate } from "uuid";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response) {
    const { username, age, hobbies } = req.body;

    if (
      typeof username !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies) ||
      hobbies.some((hobby) => typeof hobby !== "string")
    ) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const newUser = await this.userService.createUser({
      username,
      age,
      hobbies,
    });
    res.status(201).json(newUser);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, age, hobbies } = req.body;

    if (!validate(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updatedUser = await this.userService.updateUser(id, {
      username,
      age,
      hobbies,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const success = await this.userService.deleteUser(id);

    if (!success) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  }
}

export default UserController;
