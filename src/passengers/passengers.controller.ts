import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { DriverIdParamDto } from 'src/drivers/dto/driver-id-param.dto';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengerService: PassengersService) {}

  @Post()
  create(@Body() dto: CreatePassengerDto) {
    return this.passengerService.create(dto);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param() dto: DriverIdParamDto) {
    return this.passengerService.findOne(dto.id);
  }
}
