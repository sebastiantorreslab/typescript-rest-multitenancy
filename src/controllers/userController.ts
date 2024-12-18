import { Request, Response } from "express";
import { z } from "zod";
import {
  getTenantUsers,
  createTenantUser,
  tenantIsExists,
  createUserGeneral,
  deleteUserGeneral,
  findUserGeneral,
  updateUserGeneral,
} from "../services/userService";

export const getUsersForTenant = async (req: Request, res: Response) => {
  try {
    const users = await getTenantUsers(req, res);
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener usuarios: ${error.message}` });
  }
};

export const registerUserForTenant = async (req: Request, res: Response) => {
  try {
    // Verifica si el tenant existe, si no, retorna un error
    const tenantExists = await tenantIsExists(req, res);

    if (!tenantExists) {
      console.log("Tenant does not exist");
    }

    const user = await createTenantUser(req, res);

    res.status(201).json({
      message: `Usuario registrado exitosamente para el tenant".`,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al registrar el usuario: ${error.message}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserGeneral(req, res);
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

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await updateUserGeneral(req, res);

  res.json(updatedUser);
};

export const findUser = async (req: Request, res: Response) => {
  const user = await findUserGeneral(req, res);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await deleteUserGeneral(req, res);
  res.json(user);
};
