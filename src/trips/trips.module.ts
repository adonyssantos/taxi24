import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Trip } from './entities/trip.entity';
import { Passenger } from '../passengers/entities/passenger.entity';
import { Driver } from '../drivers/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Passenger, Driver])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
