import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';
import { TripStatus } from 'src/shared/constants/trip-status.enum';

export class GetTripsDto {
  @ApiProperty({
    example: Mock.TRIP_STATUS,
    required: false,
  })
  @IsOptional()
  @IsIn([TripStatus.ACTIVE, TripStatus.COMPLETED], {
    message: `Status must be either "${TripStatus.ACTIVE}" or "${TripStatus.COMPLETED}"`,
  })
  status?: string;
}
