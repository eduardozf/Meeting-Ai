import { type IUploader } from '@/interfaces';
import OnPremiseUploader from '../uploader/OnPremiseUploader';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { multerConfig, uploadOnPremises } from '@/config/multer.config';
import AppError from '@/errors/AppError';
import { promisify } from 'util';

class UploadFile {
  private readonly uploader: IUploader;

  constructor() {
    this.uploader = new OnPremiseUploader(multerConfig.path);
  }

  public async uploadFile(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<void> {
    try {
      const uploadSingle = promisify(uploadOnPremises.single('file')).bind(
        uploadOnPremises,
      );

      await uploadSingle(req, res);

      if (!req?.file) throw new AppError('No file provided');

      const fileName = await this.uploader.upload(req.file);
      res.status(200).send({ fileName });
    } catch (error) {
      throw new AppError('Error ocurred while uploading file');
    }
  }
}
export default UploadFile;
