import { DocumentDefinition } from "mongoose";
import UserModel, { I_UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(
  user: DocumentDefinition<I_UserDocument>
): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  try {
    if (JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");

    const foundUser = await UserModel.findOne({
      name: user.name,
    });

    if (!foundUser) {
      throw new Error("Name of user not correct");
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (!isMatch) {
      throw new Error("Password of user not correct");
    }

    const token = jwt.sign(
      { _id: foundUser._id?.toString(), name: foundUser.name },
      JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );

    return { user: { _id: foundUser._id, name: foundUser.name }, token };
  } catch (error) {
    throw error;
  }
}
export function loginOne(body: any) {
  throw new Error("Function not implemented.");
}
