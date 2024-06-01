import IDGenerator from '@/shared/services/IDGenerator';
import { splitFileName } from '@/shared/utils/strings';
import multer from 'fastify-multer';
import path from 'path';

const multerConfig = {
  path: path.resolve(path.dirname('.'), '..', '..', '..', 'storage'),
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, multerConfig.path);
  },
  filename: (req, file, cb) => {
    const { generateID } = new IDGenerator();

    const fileHash = generateID();
    const { format } = splitFileName(file.originalname);
    const fileName = `${fileHash}.${format}`;

    cb(null, fileName);
  },
});

const uploadOnPremises = multer({ storage });

export { uploadOnPremises, multerConfig };
