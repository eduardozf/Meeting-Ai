import IDGenerator from '@/shared/services/IDGenerator';
import { splitFileName } from '@/shared/utils/strings';
import multer from 'fastify-multer';
import path from 'path';

const dirname = process.cwd();

const multerConfig = {
  path: path.resolve(dirname, 'storage'),
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, multerConfig.path);
  },
  filename: (req, file, cb) => {
    const generator = new IDGenerator();

    const fileHash = generator.generateID();
    const { format } = splitFileName(file.originalname);
    const fileName = `${fileHash}.${format}`;

    cb(null, fileName);
  },
});

const uploadOnPremises = multer({ storage });

export { uploadOnPremises, multerConfig };
