import { PrismaClient } from '@prisma/client';
import path from 'path';

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
