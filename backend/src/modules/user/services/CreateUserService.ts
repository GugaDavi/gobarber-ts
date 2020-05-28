import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import UsersRepository from '@modules/user/repositories/UserRepository';
import AppErrors from '@shared/errors/AppErrors';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository
  ) {}

  public async run({ name, email, password }: RequestDTO) {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppErrors('Email address already used', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
