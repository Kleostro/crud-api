import User from "../models/User";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

class UserService {
  private readonly dataFile: string;

  constructor() {
    this.dataFile = path.join(process.cwd(), "users.json");
  }

  private async readData(): Promise<Map<string, User>> {
    try {
      const data = await fs.promises.readFile(this.dataFile, "utf8");
      return new Map(Object.entries(JSON.parse(data)));
    } catch (error) {
      return new Map();
    }
  }

  private async writeData(users: Map<string, User>): Promise<void> {
    const data = JSON.stringify(Object.fromEntries(users));
    await fs.promises.writeFile(this.dataFile, data);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.readData();
    return Array.from(users.values());
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.readData();
    return users.get(id) || null;
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
    };
    const users = await this.readData();
    users.set(newUser.id, newUser);
    await this.writeData(users);
    return newUser;
  }

  async updateUser(
    id: string,
    userData: Partial<Omit<User, "id">>
  ): Promise<User | null> {
    const users = await this.readData();
    const user = users.get(id);

    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...userData };
    users.set(id, updatedUser);
    await this.writeData(users);

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const users = await this.readData();
    const result = users.delete(id);
    if (result) {
      await this.writeData(users);
    }
    return result;
  }
}

export default UserService;
