import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { localDevice } from '../enum/device.local.enum';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Nome do dispositivo', example: 'Lâmpada da sala' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ name: 'Modelo do dispositivo', example: '631b2f046f2d2f24a7c0c948' })
  model_id: string;

  @IsEnum(localDevice)
  @ApiProperty({ name: 'Local de instalação do dispositivo', example: 'Casa' })
  place: localDevice;
}
