import getPrismaClientForTenant from "../utils/prismaClient";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserSchema } from "../schemas/userSchema";
import { z } from "zod";

const prisma = new PrismaClient();

export const getUsersForTenant = async (req: Request, res: Response) => {
  const { tenantName } = req.headers;

  if (!tenantName) {
    return res
      .status(400)
      .json({ message: "El nombre del tenant es obligatorio." });
  }

  const prisma = getPrismaClientForTenant(tenantName as string);

  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener usuarios: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const getTenantUsers = async (req: Request, res: Response) => {
  const { tenantName } = req.params;

  const prisma = getPrismaClientForTenant(tenantName);

  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener usuarios: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const createTenantUser = async (req: Request, res: Response) => {
  const { tenantName } = req.params; // Usamos params para obtener el nombre del tenant desde la URL
  const { name, username, role, categoryId } = req.body;

  // Obtén la instancia de Prisma para el tenant correspondiente
  const prisma = getPrismaClientForTenant(tenantName);

  try {
    // Verifica si el tenant existe, si no, retorna un error
    const tenantExists = await prisma.tenant.findUnique({
      where: { name: tenantName },
    });

    if (!tenantExists) {
      console.log("Tenant does not exist");
    }

    // Registra el usuario en la base de datos del tenant
    const user = await prisma.user.create({
      data: {
        name,
        username,
        role: role,
        categoryId,
      },
    });

    res.status(201).json({
      message: `Usuario registrado exitosamente para el tenant "${tenantName}".`,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al registrar el usuario: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const tenantIsExists = async (req: Request, res: Response) => {
  const { tenantName } = req.params;
  const tenant = await prisma.tenant.findUnique({
    where: { name: tenantName },
  });
  return tenant;
};

export const createUserGeneral = async (req: Request, res: Response) => {
  const { name, username, role, categoryId } = req.body;

  try {
    UserSchema.parse({ name, username, role, categoryId });

    const user = await prisma.user.create({
      data: {
        name,
        username,
        role: role,
        categoryId,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Errores de validación", details: error.errors });
    } else {
      res.status(500).json({ error: "Hubo un error al crear el usuario" });
    }
  }
};



export const updateUserGeneral = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
  
    res.json(updatedUser);
  };



  export const findUserGeneral = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  
    res.json(user);
  };



  export const deleteUserGeneral = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
  
    res.json(user);
  };
