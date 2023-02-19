import { randomUUID } from "node:crypto";

export abstract class BaseEntity {
  constructor(
    readonly id?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.id = id || randomUUID();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
