import 'reflect-metadata';

import CreateSessionService from '@modules/user/services/CreateSessionService';
import CreateUserService from '@modules/user/services/CreateUserService';
import AppErrors from '@shared/errors/AppErrors';

import FakeUsersRepository from '@tests-modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@tests-shared/providers/hashProvider/fakes/FakeBCryptHashProvider';

describe('Create Session', () => {
  it('Should be able authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.run({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    const response = await createSession.run({
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      createSession.run({
        email: 'jonhdoe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.run({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123123',
    });

    expect(
      createSession.run({
        email: 'jonhdoe@example.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
