import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/users/CreateUserService';
import ListUsers from '../services/users/ListUsers';
import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const listenerUser = new ListUsers();

  const users = await listenerUser.run();

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.run({ name, email, password });

  delete user.password;

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.run({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  }
);

export default usersRouter;
