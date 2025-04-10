import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';

export class GetDriverInRadiusDto {
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
    example: Mock.PASSENGER_DESTINATION_RADIUS,
    description: 'Radius in kilometers',
    default: 3,
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  radius?: number;
}
