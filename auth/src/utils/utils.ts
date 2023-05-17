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

  singJwt(id: string) {
    const SECRET = process.env.SECRET as Secret;
    let token = jwt.sign({ id }, SECRET, {
      expiresIn: 60 * 10, // expira em 10 minutos
    });
    return token;
  },
};
