import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class IdDeviceDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    name: 'id_device',
    description: 'Id do dispositivo',
    example: 'UUID do dispositivo',
  })
  id_device: string;
}
