import { injectable, inject } from 'tsyringe';

import UsersRepository from '@modules/user/repositories/UserRepository';
import AppErrors from '@shared/errors/AppErrors';
import HashProvider from '@shared/providers/hashProvider/models/hashProvider';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashedPassword: HashProvider
  ) {}

  public async run({ name, email, password }: RequestDTO) {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppErrors('Email address already used', 401);
    }

    const hashedPassword = await this.hashedPassword.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
