import { container } from 'tsyringe';

import '@shared/providers/hashProvider';
import '@shared/providers/storageProvider';

import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/user/repositories/UserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
