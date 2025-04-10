import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';

export class GetTripsDto {
  @ApiProperty({
    example: Mock.TRIP_STATUS,
    required: false,
  })
  @IsOptional()
  @IsIn(['active', 'complete'], {
    message: 'Status must be either "active" or "complete"',
  })
  status?: string;
}
