import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

// TODO: check this swagger docs
@ApiTags('passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly service: PassengersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new passenger',
  })
  @ApiResponse({
    status: 201,
    description: 'Passenger created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  create(@Body() dto: CreatePassengerDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all passengers',
    description: 'Fetches a list of all passengers in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of passengers retrieved successfully.',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a passenger by ID',
    description: 'Fetches details of a specific passenger using their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the passenger to retrieve.',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Passenger details retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Passenger not found.',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
