import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Mock } from 'src/shared/constants/mock.map';

export class CreateDriverDto {
  @ApiProperty({
    example: Mock.DRIVER_NAME,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: Mock.DRIVER_EMAIL,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: Mock.DRIVER_PHONE,
    required: true,
  })
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({
    example: Mock.DRIVER_CURRENT_LAT,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  current_lat: number;

  @ApiProperty({
    example: Mock.DRIVER_CURRENT_LNG,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  current_lng: number;
}
