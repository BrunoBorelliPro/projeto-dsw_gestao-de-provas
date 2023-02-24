import { ObjectId } from "mongodb";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterOutput = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  _id?: ObjectId;
};
