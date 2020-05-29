import { container } from 'tsyringe';

import IStorageProvider from '@shared/providers/storageProvider/models/StorageProvider';
import DiskStorageProvider from '@shared/providers/storageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
