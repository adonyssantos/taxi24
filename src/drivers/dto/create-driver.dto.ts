import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  current_lat: number;

  @IsNotEmpty()
  @IsNumber()
  current_lng: number;
}
