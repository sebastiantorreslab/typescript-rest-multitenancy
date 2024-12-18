import { Request, Response } from "express";
import {
  createCategoryTenant,
  createCategoryGeneral,
  findCategoriesGeneral,
  deleteCategoryGeneral,
} from "../services/categoryService";

export const createCategoryForTenant = async (req: Request, res: Response) => {
  const response = await createCategoryTenant(req, res);
  res.json(response);
};

export const findCategories = async (req: Request, res: Response) => {
  const categories = await findCategoriesGeneral(req, res);
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const category = await createCategoryGeneral(req, res);
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const category = await deleteCategoryGeneral(req, res);
  res.json(category);
};
