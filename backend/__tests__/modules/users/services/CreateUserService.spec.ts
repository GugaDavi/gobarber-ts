import 'reflect-metadata';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppErrors from '@shared/errors/AppErrors';

import FakeUsersRepository from '@tests-modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@tests-shared/providers/hashProvider/fakes/FakeBCryptHashProvider';

describe('Create user', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.run({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.run({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    expect(
      createUser.run({
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
