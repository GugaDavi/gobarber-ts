import { injectable, inject } from 'tsyringe';

import UsersRepository from '@modules/user/repositories/UserRepository';
import StorageProvider from '@shared/providers/storageProvider/models/StorageProvider';
import AppErrors from '@shared/errors/AppErrors';

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository,

    @inject('StorageProvider')
    private storageProvider: StorageProvider
  ) {}

  public async run({ userId, avatarFilename }: RequestDTO) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppErrors('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
