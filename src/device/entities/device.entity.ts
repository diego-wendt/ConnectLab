import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @ManyToOne(() => ModelEntity, (model) => model.model)
  // model: ModelEntity;
}

// @ManyToMany(() => UserEntity, (user) => user.devices)
// user: UserEntity[];
