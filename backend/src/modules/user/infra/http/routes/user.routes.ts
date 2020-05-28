import { Router } from 'express';
import multer from 'multer';

import UsersController from '@modules/user/infra/http/controllers/UsersController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', UsersController.index);

usersRouter.post('/', UsersController.store);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UsersController.update
);

export default usersRouter;
