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
  @ApiProperty({ name: 'Id do dispositivo do usuário', example: 'UUID do dispositivo' })
  id_device: string;
}
