import { Repository, getRepository } from 'typeorm';

import CreateUserDTO from '@modules/user/dtos/CreateUserDTO';
import UserRepository from '@modules/user/repositories/UserRepository';

import User from '@modules/user/infra/typeorm/entities/User';

class UsersRepository implements UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find(options: object): Promise<User[]> {
    const users = await this.ormRepository.find(options);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const appoinment = this.ormRepository.create(userData);

    await this.ormRepository.save(appoinment);

    return appoinment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
