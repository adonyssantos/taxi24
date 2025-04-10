import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly service: PassengersService) {}

  @Post()
  create(@Body() dto: CreatePassengerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
