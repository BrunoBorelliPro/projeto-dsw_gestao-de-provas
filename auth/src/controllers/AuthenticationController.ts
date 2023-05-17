import { Request, Response } from "express";
import UserService from "../services/UserService";
import utils from "../utils/utils";

export default {
  async login(req: Request, res: Response) {
    console.log(req.body.username);
    if (req.body.hasOwnProperty("username")) {
      const userLogin = await UserService.getByUsername(req.body.username);
      if (userLogin) {
        console.log(userLogin);
        const authenticated = await utils.comparePwd(
          req.body.password,
          userLogin.password
        );
        if (authenticated) {
          const token = utils.singJwt(userLogin._id.toString());
          res.set("Authorization", `Bearer ${token}`);
          res.status(200).json(userLogin);
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  },
  async logout(req: Request, res: Response) {
    res.set("Authorization", "Bearer ");
    res.status(200).send();
  },
};
