import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppErrors from '@shared/errors/AppErrors';
import UsersRepository from '@modules/user/repositories/UserRepository';
import HashProvider from '@shared/providers/hashProvider/models/hashProvider';

interface RequestDTO {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashedPassword: HashProvider
  ) {}

  public async run({ email, password }: RequestDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashedPassword.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppErrors('Incorrect email/password combination', 401);
    }

    delete user.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
