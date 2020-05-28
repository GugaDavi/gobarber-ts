import { Repository, getRepository } from 'typeorm';

import iAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements iAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date) {
    const findedAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findedAppointment;
  }

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appoinment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appoinment);

    return appoinment;
  }
}

export default AppointmentsRepository;
