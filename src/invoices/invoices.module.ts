import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Trip])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
