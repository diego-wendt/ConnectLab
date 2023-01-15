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
  page: string;
  
  @IsOptional()
  @IsNumberString()
  size: string;
  
  @IsOptional()
  @IsEnum(localDevice)
  place: localDevice;
}
