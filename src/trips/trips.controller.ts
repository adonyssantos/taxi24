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
import { TripStatus } from 'src/shared/constants/trip-status.enum';
import { Messages } from 'src/shared/constants/messages.enum';
import { Response, response } from 'src/shared/utils/response.util';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(@Body() dto: CreateTripDto): Promise<Response<Trip>> {
    const trip = await this.tripsService.create(dto);
    return response(Messages.TRIP_CREATED_SUCCESSFULLY, trip);
  }

  @Get()
  async findAll(@Query() query: GetTripsDto): Promise<Response<Trip[]>> {
    const trips = await this.tripsService.findByStatus(
      query.status as TripStatus | undefined,
    );
    return response(Messages.TRIP_FOUND_SUCCESS, trips);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string): Promise<Response<Trip>> {
    const completedTrip = await this.tripsService.complete(id);
    return response(Messages.TRIP_COMPLETED_SUCCESS, completedTrip);
  }
}
