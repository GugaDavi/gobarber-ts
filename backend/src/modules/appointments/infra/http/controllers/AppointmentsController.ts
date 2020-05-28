import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppontimentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
  public async create(req: Request, res: Response) {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppontimentService);

    const appointment = await createAppointment.run({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
