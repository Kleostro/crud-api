import User from "../models/User";

class UserService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}

export default UserService;
