import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { localDevice } from '../enum/device.local.enum';

export class PlaceDto {

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ name: 'Página a ser exibida', example: '2' })
  page: string;
  
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ name: 'Quantidade de itens por página', example: '15' })
  size: string;
  
  @IsOptional()
  @IsEnum(localDevice)
  @ApiProperty({ name: 'Local para filtro dos dispositivos', example: 'Casa' })
  place: localDevice;
}
