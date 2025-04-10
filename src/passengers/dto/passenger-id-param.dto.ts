import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PassengerIdParamDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
