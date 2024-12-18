import { Request, Response } from "express";
import { registerTenantService } from "../services/tenantService";

export const registerTenant = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const tenant = await registerTenantService(req, res);
    res
      .status(201)
      .json({ message: `Tenant "${name}" registrado exitosamente.`, tenant });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al registrar el tenant: ${error.message}` });
  }
};
