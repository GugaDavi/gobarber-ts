import { Router } from 'express';

import SessionsController from '@modules/user/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsController.store);

export default sessionsRouter;
