import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ unique: true, length: 50, nullable: false })
  email: string;

  @Column({ default: 'https://publicdomainvectors.org/photos/1389952697.png' })
  url: string;

  @Column({ length: 11, nullable: true })
  phone: string;

  @OneToOne((type) => AddressEntity, (address) => address.user, {
    cascade: true
  })
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

  @OneToMany(() => DeviceEntity, (device) => device.user, { cascade: true })
  devices: DeviceEntity[];

  checkPassword(password) {
    if (this.password === bcrypt.hashSync(password, this.salt)) {
      return true;
    }
  }

  addDevice(device: DeviceEntity) {
    if (this.devices == null) {
      this.devices = new Array<DeviceEntity>();
    }
    this.devices.push(device);
  }
}
