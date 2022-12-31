import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';
import { AddressEntity } from './address.entity';
import * as bcrypt from 'bcrypt';
import { DeviceEntity } from 'src/device/entities/device.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ default: 'https://publicdomainvectors.org/photos/1389952697.png' })
  url: string;

  @Column({ length: 11 })
  phone: string;

  @OneToOne((type) => AddressEntity, (address) => address.user, {
    cascade: true,
  })
  @JoinColumn()
  address: AddressEntity;

  @Column()
  active: boolean;

  @Column()
  salt: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_date' })
  deletedAt: Date;

  @ManyToMany(() => DeviceEntity)
  @JoinTable({ name: 'user_devices' })
  devices: DeviceEntity[];

  checkPassword(password) {
    if (this.password === bcrypt.hashSync(password, this.salt)) {
      return true;
    }
  }

  addDevice(devices: DeviceEntity[]) {
    if (this.devices == null) {
      this.devices = new Array<DeviceEntity>();
    }
    this.devices.push(...devices);
  }
}
