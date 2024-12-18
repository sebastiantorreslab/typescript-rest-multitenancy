import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTenantDatabase = async (
  tenantName: string
): Promise<void> => {
  const dbPath = path.resolve(__dirname, `../databases/${tenantName}.sqlite`);

  if (fs.existsSync(dbPath)) {
    throw new Error(
      `La base de datos para el tenant "${tenantName}" ya existe.`
    );
  }

  try {
    fs.writeFileSync(dbPath, "");
    console.log(`Base de datos creada para el tenant: ${tenantName}`);

    process.env.DATABASE_URL = `file:${dbPath}`;
    execSync("npx prisma migrate deploy", { stdio: "inherit" });

    console.log(`Migraciones aplicadas para la base de datos: ${tenantName}`);
  } catch (error) {
    console.error(
      `Error al crear la base de datos para el tenant "${tenantName}":`,
      error
    );
    throw error;
  }
};

export const registerTenantService = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const tenant = await prisma.tenant.create({ data: { name } });
    await createTenantDatabase(name);

    res
      .status(201)
      .json({ message: `Tenant "${name}" registrado exitosamente.`, tenant });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al registrar el tenant: ${error.message}` });
  }
};
