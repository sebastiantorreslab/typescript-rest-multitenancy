import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { registerTenant } from "../controllers/tenantController";
import { createCategoryForTenant } from "../controllers/categoryController";
import {
  getUsersForTenant,
  registerUserForTenant,
} from "../controllers/userController";
import { loggerMiddleware } from "../middlewares/index";

const prisma = new PrismaClient();
const router = Router();

router.post("/tenants", [loggerMiddleware], registerTenant);
router.post(
  "/tenants/:tenantName/users",
  [loggerMiddleware],
  registerUserForTenant
);
router.get("/tenants/:tenantName/users", [loggerMiddleware], getUsersForTenant);
router.post(
  "/tenants/:tenantName/categories",
  [loggerMiddleware],
  createCategoryForTenant
);

export default router;
