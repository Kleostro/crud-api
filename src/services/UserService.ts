import User from "../models/User";
import { v4 as uuidv4 } from "uuid";
class UserService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: Omit<User, "id">): User {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, userData: Omit<User, "id">): User | null {
    const user = this.getUserById(id);

    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...userData };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user
    );

    return updatedUser;
  }
}

export default UserService;
