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
}

export default UserService;
