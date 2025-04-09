import { IsUUID, IsNumber, IsEnum } from 'class-validator';
import { TripStatus } from '../../../shared/constants/trip-status.enum';

export class CreateTripDto {
  @IsUUID()
  passenger_id: string;

  @IsUUID()
  driver_id: string;

  @IsNumber()
  start_lat: number;

  @IsNumber()
  start_lng: number;

  @IsNumber()
  end_lat: number;

  @IsNumber()
  end_lng: number;

  @IsEnum(TripStatus)
  status: TripStatus;
}
