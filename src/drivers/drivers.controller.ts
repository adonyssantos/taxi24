import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { GetDriverInRadiusDto } from './dto/get-driver-in-radius.dto';
import { DriverIdParamDto } from './dto/driver-id-param.dto';
import { Messages } from 'src/shared/constants/messages.enum';
import { Response, response } from 'src/shared/utils/response.util';
import { Driver } from './entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(@Body() dto: CreateDriverDto): Promise<Response<Driver>> {
    const createdDriver = await this.driversService.create(dto);
    return response(Messages.DRIVER_CREATED_SUCCESSFULLY, createdDriver);
  }

  @Get()
  async findAll(): Promise<Response<Driver[]>> {
    const drivers = await this.driversService.findAll();
    return response(Messages.DRIVERS_RETRIEVED_SUCCESSFULLY, drivers);
  }

  @Get('available')
  async findAvailable(): Promise<Response<Driver[]>> {
    const drivers = await this.driversService.findAvailable();
    return response(Messages.DRIVERS_RETRIEVED_SUCCESSFULLY, drivers);
  }

  @Get('in-radius')
  async findInRadius(
    @Query() dto: GetDriverInRadiusDto,
  ): Promise<Response<Driver[]>> {
    const drivers = await this.driversService.findInRadius(
      dto.current_lat,
      dto.current_lng,
      dto.radius,
    );
    return response(Messages.DRIVERS_RETRIEVED_SUCCESSFULLY, drivers);
  }

  @Get(':id')
  async findOne(@Param() dto: DriverIdParamDto): Promise<Response<Driver>> {
    const driver = await this.driversService.findOne(dto.id);
    return response(Messages.DRIVER_FOUND_SUCCESS, driver);
  }
}
