import ObjectID from 'bson-objectid';
import { db } from '../../../infra/database';
import AppError from '../../../errors/AppError';

interface CreateMeetParams {
  id?: string;
  userId: string;
  title: string;
}

class CreateMeet {
  async create(body: CreateMeetParams) {
    const newMeet = await db.meet.create({ data: body });
    if (!newMeet) throw new AppError('Failed to create a new meeting');
  }
}

export default CreateMeet;
