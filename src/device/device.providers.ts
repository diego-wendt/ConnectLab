import { DataSource } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import { ModelEntity } from './entities/model.entity';

export const DeviceProviders = [
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MODEL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ModelEntity),
    inject: ['DATA_SOURCE'],
  },
];
