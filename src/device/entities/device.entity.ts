import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { localDevice } from '../enum/device.local.enum';
import { ModelEntity } from './model.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id_device: string;

  @Column()
  name: string;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @Column()
  switch_state: boolean;

  @Column({ type: 'enum', enum: localDevice })
  place: localDevice;

  @ManyToOne(() => ModelEntity, (model) => model.model)
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;

  @ManyToOne(() => UserEntity, (user) => user.devices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_devices' })
  user: UserEntity;
}
