import { Express, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

function preventCrossSiteScripting(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
}

export function applyServerHardening(app: Express): void {
  app.disable("x-powered-by");
  app.use(preventCrossSiteScripting);
}

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} request made to ${req.path}`);
  next();
};

const getPrismaClientForTenant = (tenantName: string): PrismaClient => {
  const dbPath = path.resolve(__dirname, `../databases/${tenantName}.sqlite`);
  return new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });
};

export default getPrismaClientForTenant;
