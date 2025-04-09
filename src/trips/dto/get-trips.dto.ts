import { IsOptional, IsIn } from 'class-validator';

export class GetTripsDto {
  @IsOptional()
  @IsIn(['active', 'complete'], {
    message: 'Status must be either "active" or "complete"',
  })
  status?: string;
}
