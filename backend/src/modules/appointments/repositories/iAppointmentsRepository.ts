import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';

export default interface iAppoinmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: CreateAppointmentDTO): Promise<Appointment>;
}
