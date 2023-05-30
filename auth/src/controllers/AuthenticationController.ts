import { Request, Response } from "express";
import UserService from "../services/UserService";
import utils from "../utils/utils";

export default {
  async login(req: Request, res: Response) {
    console.log(req.body.email);
    if (req.body.hasOwnProperty("email")) {
      const userLogin = await UserService.getByEmail(req.body.email);
      if (userLogin) {
        console.log(userLogin);
        const authenticated = await utils.comparePwd(
          req.body.password,
          userLogin.password
        );
        if (authenticated) {
          const token = utils.singJwt({
            id: userLogin.user_id,
            user_id: userLogin.user_id,
            isTeacher: userLogin.isTeacher,
          });
          res.status(200).json({
            userId: userLogin.user_id,
            token: token,
            isTeacher: userLogin.isTeacher,
            exp: utils.getExpirationDate(token),
          });
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
};
