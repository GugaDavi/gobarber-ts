import { uuid } from 'uuidv4';

import iAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements iAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
