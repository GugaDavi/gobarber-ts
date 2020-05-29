import 'reflect-metadata';

import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';
import AppErrors from '@shared/errors/AppErrors';

import FakeStorageProvider from '@tests-shared/providers/storageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@tests-modules/users/repositories/fakes/FakeUsersRepository';

describe('Update User Avatar', () => {
  it('Should be able to update', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    await updateUserAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('Should not be able to update user avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatar.run({
        userId: 'non-existing-user',
        avatarFilename: 'avatar.png',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('Should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'delete');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    await updateUserAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
