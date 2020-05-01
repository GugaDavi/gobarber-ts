import User from '../../models/User';
import { getRepository } from 'typeorm';

class ListUsers {
  public async run() {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at', 'avatar'],
    });

    return users;
  }
}

export default ListUsers;
