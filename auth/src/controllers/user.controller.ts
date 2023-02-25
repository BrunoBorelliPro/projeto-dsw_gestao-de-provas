import { Request, Response } from "express";
import { getErrorMessage } from "../errors/errors";
import * as userServices from "../services/user.service";
export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).send("Inserted successfully");
  } catch (err) {
    res.status(500).send(getErrorMessage(err));
  }
};
