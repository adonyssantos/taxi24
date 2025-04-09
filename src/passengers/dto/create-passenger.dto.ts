import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePassengerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
