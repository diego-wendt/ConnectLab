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
  @ApiProperty({
    name: 'page',
    description: 'Número da página a ser exibida',
    example: '2',
  })
  page: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    name: 'size',
    description: 'Quantidade de itens por página',
    example: '15',
  })
  size: string;

  @IsOptional()
  @IsEnum(localDevice)
  @ApiProperty({
    name: 'place',
    description: 'Local para filtro dos dispositivos',
    example: 'Casa',
  })
  place: localDevice;
}
