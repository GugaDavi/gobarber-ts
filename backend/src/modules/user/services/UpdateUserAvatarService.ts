import { join } from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import UsersRepository from '@modules/user/repositories/UserRepository';
import updateConfig from '@config/upload';

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UsersRepository
  ) {}

  public async run({ userId, avatarFilename }: RequestDTO) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = join(updateConfig.diretory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
