import dotenv from "dotenv";
import dbo from "../db/conn";
import { ObjectId } from "mongodb";
import e from "express";
const collection = "users";

export default {
  async create(matchUser: {
    name: string;
    email: string;
    password: string | undefined;
    isTeacher: boolean;
    created_at: Date;
  }) {
    const dbConnect = dbo.getDb();
    await dbConnect.collection(collection).insertOne(matchUser);
  },

  async getById(id: string) {
    const dbConnect = dbo.getDb();
    return await dbConnect
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
  },

  async update(
    id: string,
    matchUser: {
      name: string;
      email: string;
      password: string | undefined;
      isTeacher: boolean;
    }
  ) {
    const dbConnect = dbo.getDb();
    return await dbConnect

      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: matchUser });
  },

  async delete(id: string) {
    const dbConnect = dbo.getDb();
    return await dbConnect
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
  },

  async getByName(name: string) {
    console.log(`Get user by name: ${name}`);
    const dbConnect = dbo.getDb();
    return await dbConnect.collection(collection).findOne({ name: name });
  },

  async getByEmail(email: string) {
    console.log(`Get user by email: ${email}`);
    const dbConnect = dbo.getDb();
    return await dbConnect.collection(collection).findOne({ email: email });
  },
};
