import { PrismaClient } from "@prisma/client";

declare const globalThis: {
  prismaAuth: PrismaClient;
} & typeof global;

const prismaAuthSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
      },
    },
  });
};

export const prismaAuth = globalThis.prismaAuth ?? prismaAuthSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaAuth = prismaAuth;
}
