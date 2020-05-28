import { injectable, inject } from 'tsyringe';

import UsersRepository from '@modules/user/repositories/UserRepository';

@injectable()
class ListUsers {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository
  ) {}

  public async run() {
    const users = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at', 'avatar'],
    });

    return users;
  }
}

export default ListUsers;
