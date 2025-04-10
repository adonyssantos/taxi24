import { Controller, Get, Query } from '@nestjs/common';
import { GetNearestDriversDto } from './dto/get-nearest-drivers.dto';
import { PassengerDriversService } from './passenger-drivers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Passengers')
@Controller('passenger')
export class PassengerDriversController {
  constructor(
    private readonly passengerDriversService: PassengerDriversService,
  ) {}

  @Get('nearby')
  findInRadius(@Query() dto: GetNearestDriversDto) {
    return this.passengerDriversService.findNearby(
      dto.current_lat,
      dto.current_lng,
      dto.radius,
    );
  }
}
