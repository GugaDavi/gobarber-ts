import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/user/services/CreateSessionService';

class SessionsController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, token } = await createSession.run({ email, password });

    return res.json({ user, token });
  }
}

export default new SessionsController();
