import { container } from 'tsyringe';

import IHashProvider from '@shared/providers/hashProvider/models/hashProvider';
import BCryptHashProvider from '@shared/providers/hashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
