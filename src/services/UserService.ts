import User from "../models/User";

class UserService {
  private users: User[] = [];

  async getUsers() {
    return this.users;
  }
}

export default UserService;
