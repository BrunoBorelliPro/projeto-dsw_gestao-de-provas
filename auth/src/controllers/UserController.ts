import UserService from "../services/UserService";
import utils from "../utils/utils";

function validateUser(user: any) {
  if (user.name && user.email && user.password && user.user_id) {
    return true;
  }
  return false;
}
export default {
  async create(req: any, res: any) {
    console.log(`[UserController] - create`);
    const matchDocument = {
      name: req.body.name,
      email: req.body.email,
      user_id: req.body.user_id,
      isTeacher: req.body.isTeacher,
      password: await utils.encryptPwd(req.body.password),
      created_at: new Date(),
    };

    if (!validateUser(matchDocument)) {
      res.status(400).json({ message: "Dados inválidos!" });
      return;
    }

    UserService.create(matchDocument)
      .then((result: any) => {
        res.status(201).json({ message: "Usuário criado com sucesso!" });
      })
      .catch((err: any) => {
        res.status(400).json({ message: "Erro ao criar o usuário!" });
      });
  },

  async get(req: any, res: any) {
    UserService.getById(req.params.id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        res.status(404).json({ message: "Usuário não encontrado!" });
      });
  },

  async update(req: any, res: any) {
    const matchDocument = {
      name: req.body.name,
      email: req.body.email,
      user_id: req.body.user_id,
      isTeacher: req.body.isTeacher,
      password: await utils.encryptPwd(req.body.password),
      updated_at: new Date(),
    };
    if (!validateUser(matchDocument)) {
      res.status(400).json({ message: "Dados inválidos!" });
      return;
    }
    UserService.update(req.params.id, matchDocument)
      .then((result: any) => {
        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
      })
      .catch((err: any) => {
        res.status(400).json({ message: "Erro ao atualizar o usuário!" });
      });
  },

  async delete(req: any, res: any) {
    UserService.delete(req.params.id)
      .then((result: any) => {
        res.status(200).json({ message: "Usuário removido com sucesso!" });
      })
      .catch((err: any) => {
        res.status(400).json({ message: "Erro ao remover o usuário!" });
      });
  },
};
