import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { DriverIdParamDto } from 'src/drivers/dto/driver-id-param.dto';
import { Messages } from 'src/shared/constants/messages.enum';
import { Response, response } from 'src/shared/utils/response.util';
import { Passenger } from './entities/passenger.entity';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengerService: PassengersService) {}

  @Post()
  async create(@Body() dto: CreatePassengerDto): Promise<Response<Passenger>> {
    const createdPassenger = await this.passengerService.create(dto);
    return response(Messages.PASSENGER_CREATED_SUCCESSFULLY, createdPassenger);
  }

  @Get()
  async findAll(): Promise<Response<Passenger[]>> {
    const passengers = await this.passengerService.findAll();
    return response(Messages.PASSENGERS_RETRIEVED_SUCCESSFULLY, passengers);
  }

  @Get(':id')
  async findOne(@Param() dto: DriverIdParamDto): Promise<Response<Passenger>> {
    const passenger = await this.passengerService.findOne(dto.id);
    return response(Messages.PASSENGER_RETRIEVED_SUCCESSFULLY, passenger);
  }
}
