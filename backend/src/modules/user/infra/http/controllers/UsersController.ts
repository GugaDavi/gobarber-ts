import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsers from '@modules/user/services/ListUsers';
import CreateUserService from '@modules/user/services/CreateUserService';
import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';

class UsersController {
  public async index(req: Request, res: Response) {
    const listenerUser = container.resolve(ListUsers);

    const users = await listenerUser.run();

    return res.json(users);
  }

  public async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({ name, email, password });

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.run({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  }
}

export default new UsersController();
