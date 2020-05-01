import { getRepository } from 'typeorm';
import { join } from 'path';
import fs from 'fs';

import User from '../../models/User';
import updateConfig from '../../config/upload';

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async run({ userId, avatarFilename }: RequestDTO) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

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

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
