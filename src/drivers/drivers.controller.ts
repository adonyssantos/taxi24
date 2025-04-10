import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { GetDriverInRadiusDto } from './dto/get-driver-in-radius.dto';
import { DriverIdParamDto } from './dto/driver-id-param.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() dto: CreateDriverDto) {
    return this.driversService.create(dto);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.driversService.findAvailable();
  }

  @Get('in-radius')
  findInRadius(@Query() dto: GetDriverInRadiusDto) {
    return this.driversService.findInRadius(
      dto.current_lat,
      dto.current_lng,
      dto.radius,
    );
  }

  @Get(':id')
  findOne(@Param() dto: DriverIdParamDto) {
    return this.driversService.findOne(dto.id);
  }
}
