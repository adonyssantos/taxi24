import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreatePassengerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
}
