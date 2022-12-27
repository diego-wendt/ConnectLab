import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  // OneToOne,
  // JoinColumn,
} from 'typeorm';
// import { AddressEntity } from './address.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  url: string;

  @Column()
  phone: string;

  // // @OneToOne((type) => AddressEntity, (address) => address.user, {
  // //   cascade: true,
  // // })
  // // @JoinColumn()
  // // address: AddressEntity;

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
}
