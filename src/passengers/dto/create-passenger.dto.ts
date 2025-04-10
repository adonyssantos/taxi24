import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';

export class CreatePassengerDto {
  @ApiProperty({
    example: Mock.PASSENGER_NAME,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: Mock.PASSENGER_EMAIL,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: Mock.PASSENGER_PHONE,
    required: true,
  })
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
}
