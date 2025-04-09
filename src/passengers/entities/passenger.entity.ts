import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
