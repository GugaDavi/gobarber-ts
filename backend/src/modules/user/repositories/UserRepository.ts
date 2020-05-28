import User from '@modules/user/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/user/dtos/CreateUserDTO';

export default interface UserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  find(options: object): Promise<User[]>;
}
