import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import AppErrors from '@shared/errors/AppErrors';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository
  ) {}

  public async run({ provider_id, date }: RequestDTO) {
    const appointmentDate = startOfHour(date);

    const findedAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findedAppointmentInSameDate) {
      throw new AppErrors('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
