import { ObjectId } from "mongodb";
export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly _id?: ObjectId
  ) {}
}
