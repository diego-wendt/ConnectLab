import { AppDataSource } from './ormconfig';

export const DatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = AppDataSource;
      return dataSource.initialize();
    },
  },
];
