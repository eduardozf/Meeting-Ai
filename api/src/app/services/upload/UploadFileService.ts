import { type IUploader } from '@/interfaces';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { multerConfig, uploadOnPremises } from '@/config/multer.config';
import AppError from '@/errors/AppError';
import { promisify } from 'util';
import { db } from '@/infra/database';
import OnPremiseUploader from '@/shared/uploader/OnPremiseUploader';
import { processError } from '@/shared/utils/error';

class UploadFileService {
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

      const file = await this.uploader.upload(req?.file);

      await db.uploadFile.create({
        data: {
          userId: req.user.id,
          meetId: file.id,
          fileName: file.fileName,
          format: file.format,
          originalFileName: file.originalFileName,
          size: file.size,
          type: file.type,
        },
      });

      res.status(200).send(file);
    } catch (error) {
      throw processError(error, 'Error ocurred while uploading file');
    }
  }
}
export default UploadFileService;
