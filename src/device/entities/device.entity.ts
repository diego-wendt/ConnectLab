import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ModelEntity } from './model.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id_device: string;

  @Column()
  customName: string;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @Column()
  signal: string;

  @Column()
  status: boolean;

  @ManyToOne(() => ModelEntity, (model) => model.model, { cascade: true })
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity;

  @ManyToOne(() => UserEntity, (user) => user.devices, { onDelete: 'CASCADE' })
  user: UserEntity;
}
