import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  street: string;

  @Column({ length: 6, nullable: false })
  number: string;

  @Column({ length: 50, nullable: false })
  neighborhood: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ length: 50, nullable: true })
  complement: string;

  @Column({ length: 8, nullable: false })
  zipCode: string;
}
