import { type File as MulterFile } from 'fastify-multer/src/interfaces';

interface IUploader {
  upload: (file: MulterFile) => Promise<IUploadResponse>;
  delete: (filename: string) => void;
  findFileOrFolder: (filename: string) => boolean;
  getContent: (filename: string) => string;
}

interface IUploadResponse {
  fileName: string;
  originalFileName: string;
  filePath: string;
  format: string;
  type: string;
  size: number;
  buffer: Buffer;
}

export type { IUploader, MulterFile, IUploadResponse };
