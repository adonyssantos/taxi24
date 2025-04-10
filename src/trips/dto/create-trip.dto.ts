import { IsUUID, IsNumber, IsEnum } from 'class-validator';
import { TripStatus } from '../../shared/constants/trip-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Mock } from 'src/shared/constants/mock.map';

export class CreateTripDto {
  @ApiProperty({
    example: Mock.PASSENGER_ID,
    required: true,
  })
  @IsUUID()
  passenger_id: string;

  @ApiProperty({
    example: Mock.DRIVER_ID,
    required: true,
  })
  @IsUUID()
  driver_id: string;

  @ApiProperty({
    example: Mock.PASSENGER_CURRENT_LAT,
    required: true,
  })
  @IsNumber()
  start_lat: number;

  @ApiProperty({
    example: Mock.PASSENGER_CURRENT_LNG,
    required: true,
  })
  @IsNumber()
  start_lng: number;

  @ApiProperty({
    example: Mock.PASSENGER_DESTINATION_LAT,
    required: true,
  })
  @IsNumber()
  end_lat: number;

  @ApiProperty({
    example: Mock.PASSENGER_DESTINATION_LNG,
    required: true,
  })
  @IsNumber()
  end_lng: number;

  @ApiProperty({
    example: Mock.TRIP_STATUS,
    required: true,
  })
  @IsEnum(TripStatus)
  status: TripStatus;
}
