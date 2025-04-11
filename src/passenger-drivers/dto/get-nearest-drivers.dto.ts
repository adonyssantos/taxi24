import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';

export class GetNearestDriversDto {
  @ApiProperty({
    example: Mock.PASSENGER_DESTINATION_LAT,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  current_lat: number;

  @ApiProperty({
    example: Mock.PASSENGER_DESTINATION_LNG,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  current_lng: number;

  @ApiProperty({
    example: Mock.PASSENGER_DRIVERS_LIMIT,
    description: 'Limit of drivers to be returned',
    default: 3,
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
