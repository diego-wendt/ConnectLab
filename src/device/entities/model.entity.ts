import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'models' })
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id_model: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;

  // @OneToMany(() => DeviceEntity, (device) => device.model)
  // model: DeviceEntity[];
}
