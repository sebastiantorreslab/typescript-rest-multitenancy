import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  findCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController";

const prisma = new PrismaClient();
const router = Router();

router.get("/categories", findCategories);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
