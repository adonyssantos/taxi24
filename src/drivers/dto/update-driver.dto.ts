import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Mock } from 'src/shared/constants/mock.map';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiProperty({
    example: Mock.DRIVER_IS_AVAILABLE,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
