import { Controller, Get, Query } from '@nestjs/common';
import { GetNearestDriversDto } from './dto/get-nearest-drivers.dto';
import { PassengerDriversService } from './passenger-drivers.service';
import { ApiTags } from '@nestjs/swagger';
import { Messages } from 'src/shared/constants/messages.enum';
import { Response, response } from 'src/shared/utils/response.util';
import { Driver } from 'src/drivers/entities/driver.entity';

@ApiTags('Passengers')
@Controller('passenger')
export class PassengerDriversController {
  constructor(
    private readonly passengerDriversService: PassengerDriversService,
  ) {}

  @Get('nearby')
  async findInRadius(
    @Query() dto: GetNearestDriversDto,
  ): Promise<Response<Driver[]>> {
    const nearbyDrivers = await this.passengerDriversService.findNearby(
      dto.current_lat,
      dto.current_lng,
      dto.limit,
    );
    return response(Messages.DRIVERS_RETRIEVED_SUCCESSFULLY, nearbyDrivers);
  }
}
