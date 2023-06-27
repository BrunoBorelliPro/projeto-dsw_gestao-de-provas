import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";
export class Service {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  close() {}
}
