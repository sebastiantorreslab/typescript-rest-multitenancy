import { Router } from "express";
import { loggerMiddleware } from "../middlewares";
import {
  createUser,
  updateUser,
  findUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.post("/users", [loggerMiddleware], createUser);
router.put("/users/:id", [loggerMiddleware], updateUser);
router.get("/users/:id", [loggerMiddleware], findUser);
router.delete("/users/:id", [loggerMiddleware], deleteUser);

export default router;
