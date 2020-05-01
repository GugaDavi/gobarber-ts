import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppErrors from '../../errors/AppErrors';

import AppointmentsRepository from '../../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async run({ provider_id, date }: RequestDTO) {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findedAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate
    );

    if (findedAppointmentInSameDate) {
      throw new AppErrors('This appointment is already booked', 400);
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
