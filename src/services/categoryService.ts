import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import getPrismaClientForTenant from "../utils/prismaClient";

const prisma = new PrismaClient();

export const createCategoryTenant = async (req: Request, res: Response) => {
  const { tenantName } = req.params;
  const { name } = req.body;

  const prisma = getPrismaClientForTenant(tenantName);

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { name: tenantName },
    });

    if (!tenant) {
      console.log("tenant does not exist");
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: `Categoría creada exitosamente para el tenant "${tenantName}".`,
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al crear la categoría: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};



export const findCategoriesGeneral =  async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
}


export const createCategoryGeneral = async (req: Request, res: Response) => {
  const category = await prisma.category.create({
    data: req.body,
  });
  res.json(category);
}


export const deleteCategoryGeneral = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.json(category);
}
