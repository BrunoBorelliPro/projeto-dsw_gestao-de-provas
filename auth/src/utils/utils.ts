import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
export default {
  async encryptPwd(pwd: string) {
    const salt = await bcrypt.genSalt(10);
    try {
      return await bcrypt.hash(pwd, salt);
    } catch (err) {
      console.log(err);
    }
  },
  async comparePwd(pwd: string, hash: string) {
    return await bcrypt.compare(pwd, hash);
  },

  singJwt({
    id,
    user_id,
    isTeacher,
  }: {
    id: string;
    user_id: string;
    isTeacher: boolean;
  }) {
    const SECRET = process.env.SECRET as Secret;
    let token = jwt.sign({ id, user_id, isTeacher }, SECRET, {
      expiresIn: 60 * 10, // expira em 10 minutos
    });
    return token;
  },

  getExpirationDate(token: string) {
    const decoded = jwt.decode(token) as {
      id: string;
      user_id: string;
      isTeacher: boolean;
      iat: number;
      exp: number;
    };
    if (decoded) {
      return decoded.exp;
    } else {
      return null;
    }
  },
};
