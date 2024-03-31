import ObjectID from 'bson-objectid';
import WriteFile from '../upload/WriteFIle';
import CreateMeet from './CreateMeet';

type HandleMeetProps = {
  id: string;
  title: string;
  language: string;
  people_count: number;
  userId: string;
};

class HandleNewMeet {
  async execute(body: HandleMeetProps) {
    // TODO mover para a rota
    // const { id: newMeetId } = ObjectID();

    // Create meet
    const meet = new CreateMeet();
    const newMeet = await meet.create(body);

    return newMeet;
  }
}

export default HandleNewMeet;
