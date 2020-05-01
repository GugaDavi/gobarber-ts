import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';
import AppErrors from '../../errors/AppErrors';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: RequestDTO) {
    const userRepository = getRepository(User);

    const userExist = await userRepository.findOne({ where: { email } });

    if (userExist) {
      throw new AppErrors('Email address already used', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
