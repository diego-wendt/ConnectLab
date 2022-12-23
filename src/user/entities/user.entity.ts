import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ unique: true, length: 50, nullable: false })
  email: string;

  @Column({ default: 'https://publicdomainvectors.org/photos/1389952697.png' })
  url: string;

  @Column({ length: 11 })
  phone: string;

  @OneToOne((type) => AddressEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  address: AddressEntity;

  @Column()
  active: boolean;

  @Column()
  salt: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  password2: string;

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_date' })
  deletedAt: Date;
}
