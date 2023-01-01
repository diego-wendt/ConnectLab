import { Column, Entity, OneToMany } from 'typeorm';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'models' })
export class ModelEntity {
  @Column({ primary: true })
  id_model: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;

  @OneToMany(() => DeviceEntity, (device) => device.model)
  model: DeviceEntity[];
}
