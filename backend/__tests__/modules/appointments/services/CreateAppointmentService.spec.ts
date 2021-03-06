import 'reflect-metadata';
import { uuid } from 'uuidv4';
import { startOfHour } from 'date-fns';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';
import AppErrors from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '@tests-modules/appointments/repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const date = startOfHour(new Date());
    const provider_id = uuid();

    const appointment = await createAppointment.run({
      date,
      provider_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment.provider_id).toEqual(provider_id);
    expect(appointment.date).toEqual(date);
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const date = startOfHour(new Date());

    await createAppointment.run({
      date,
      provider_id: uuid(),
    });

    expect(
      createAppointment.run({
        date,
        provider_id: uuid(),
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
