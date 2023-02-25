import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database/conn";
import { User } from "../database/entities/User";
import { RegisterInput, RegisterOutput } from "../types/Register";

const authRouter = Router();

// register a new user
authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.body as RegisterInput;
    const user = new User(
      reqUser.name,
      reqUser.email,
      reqUser.password,
      new Date(),
      new Date()
    );
    const { insertedId } = await collections.auth.insertOne(user);
    const insertedUser = (await collections.auth.findOne({
      _id: insertedId,
    })) as User;
    const outputUser: RegisterOutput = {
      _id: insertedUser._id,
      name: insertedUser.name,
      email: insertedUser.email,
      createdAt: insertedUser.createdAt,
      updatedAt: insertedUser.updatedAt,
    };

    res.send(outputUser);
    console.info(
      `[${outputUser.createdAt}] New user registered: ${outputUser._id}`
    );
    next();
  }
);
// delete a user
authRouter.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const reqUserId = req.params.id;
    console.info(`[${new Date()}] User deleted: ${reqUserId}`);

    const { deletedCount } = await collections.auth.deleteOne({
      _id: new ObjectId(reqUserId),
    });

    if (deletedCount === 1) {
      res.status(200);
      res.send({ message: "User deleted" });
    } else {
      res.status(404);
      res.send({ message: "User not found" });
    }

    next();
  }
);
// login
authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const reqUser = req.body as RegisterInput;
    const user = await collections.auth.findOne({
      email: reqUser.email,
    });
    if (user) {
      res.status(200);
      res.send({ message: "User logged in" });
    } else {
      res.status(404);
      res.send({ message: "User not found" });
    }
    next();
  }
);
export { authRouter };
