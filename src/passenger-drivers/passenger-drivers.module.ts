import { Module } from '@nestjs/common';
import { PassengerDriversService } from './passenger-drivers.service';
import { PassengerDriversController } from './passenger-drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [PassengerDriversService],
  controllers: [PassengerDriversController],
})
export class PassengerDriversModule {}
