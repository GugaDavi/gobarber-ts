import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';
import StorageProvider from '@shared/providers/storageProvider/models/StorageProvider';

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tpmPath, file),
      resolve(uploadConfig.uploadsFolder, file)
    );

    return file;
  }

  public async delete(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
