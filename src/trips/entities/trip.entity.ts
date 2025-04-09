import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Passenger } from '../../passengers/entities/passenger.entity';
import { Driver } from '../../drivers/entities/driver.entity';
import { TripStatus } from '../../../shared/constants/trip-status.enum';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Passenger, { eager: true })
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column('float')
  start_lat: number;

  @Column('float')
  start_lng: number;

  @Column('float')
  end_lat: number;

  @Column('float')
  end_lng: number;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.ACTIVE,
  })
  status: TripStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completed_at: Date | null;
}
