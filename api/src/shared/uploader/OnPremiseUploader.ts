import AppError from '@/errors/AppError';
import {
  type MulterFile,
  type IUploader,
  type IUploadResponse,
} from '@/interfaces';
import fs from 'fs';
import path from 'path';
import { splitFileName } from '../utils/strings';

class OnPremiseUploader implements IUploader {
  private localFolder: string;

  constructor(localFolder: string) {
    this.localFolder = localFolder;
  }

  public findFileOrFolder(path: string): boolean {
    try {
      const exists = fs.existsSync(path);
      return exists;
    } catch (error) {
      throw new AppError('Failed to find folder');
    }
  }

  protected createFolder(folderPath: string): string {
    try {
      fs.mkdirSync(folderPath);
      return folderPath;
    } catch (error) {
      throw new AppError('Failed to create folder');
    }
  }

  protected findOrCreateFolder(folderPath: string): string {
    try {
      const exists = this.findFileOrFolder(folderPath);
      if (!exists) this.createFolder(folderPath);

      return folderPath;
    } catch (error) {
      throw new AppError('Failed to find/create folder');
    }
  }

  public setFolder(path: string): this {
    this.findOrCreateFolder(path);
    this.localFolder = path;

    return this;
  }

  public getContent(filename: string): string {
    try {
      const fullPath = path.resolve(this.localFolder, filename);
      const exists = this.findFileOrFolder(fullPath);

      if (!exists) throw new AppError('File not found');

      const file = fs.readFileSync(fullPath, 'utf8');
      return file;
    } catch (error) {
      throw new AppError('Failed to get file content');
    }
  }

  public delete(filename: string): void {
    try {
      const fullPath = path.resolve(this.localFolder, filename);
      const exists = this.findFileOrFolder(fullPath);
      if (!exists) throw new AppError('File not found');

      fs.unlinkSync(fullPath);
    } catch (error) {
      throw new AppError('Failed to delete file');
    }
  }

  public async upload(file: MulterFile): Promise<IUploadResponse> {
    if (!file?.filename || !file?.size) {
      throw new AppError('File not provided');
    }

    const { name: id, format } = splitFileName(file.filename);
    const filePath = path.resolve(this.localFolder, file.filename);

    const response: IUploadResponse = {
      id,
      fileName: file.filename,
      originalFileName: file.originalname,
      filePath,
      format,
      type: file.mimetype,
      size: file.size,
    };

    return response;
  }
}

export default OnPremiseUploader;
