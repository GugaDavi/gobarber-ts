import { uuid } from 'uuidv4';

import CreateUserDTO from '@modules/user/dtos/CreateUserDTO';
import UserRepository from '@modules/user/repositories/UserRepository';

import User from '@modules/user/infra/typeorm/entities/User';

class UsersRepository implements UserRepository {
  private users: User[] = [];

  public async find(options: object): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default UsersRepository;
