import createApp from "./app";
import dotenv from "dotenv";
import UserService from "./services/UserService";
import UserController from "./controllers/UserController";

dotenv.config();

const PORT = process.env.PORT || 3000;

const userService = new UserService();
const userController = new UserController(userService);
const app = createApp(userController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
