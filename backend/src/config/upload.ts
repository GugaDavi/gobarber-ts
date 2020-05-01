import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tpmPath = resolve(__dirname, '..', '..', 'tmp');

export default {
  diretory: tpmPath,

  storage: multer.diskStorage({
    destination: tpmPath,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
