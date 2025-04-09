import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column('float')
  current_lat: number;

  @Column('float')
  current_lng: number;

  @Column({ default: true })
  is_available: boolean;
}
