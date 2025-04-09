import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './entities/trip.entity';
import { GetTripsDto } from './dto/get-trips.dto';
import { TripStatus } from '../../shared/constants/trip-status.enum';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(
    @Body() dto: CreateTripDto,
  ): Promise<{ message: string; data: Trip }> {
    const trip = await this.tripsService.create(dto);
    return {
      message: 'Trip created successfully',
      data: trip,
    };
  }

  @Get()
  async findAll(@Query() query: GetTripsDto): Promise<Trip[]> {
    return this.tripsService.findByStatus(
      query.status as TripStatus | undefined,
    );
  }

  @Patch(':id/complete')
  async complete(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Trip }> {
    return this.tripsService.complete(id);
  }
}
