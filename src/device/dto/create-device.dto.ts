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
  name: string;

  @IsNotEmpty()
  @IsString()
  model_id: string;

  @IsEnum(localDevice)
  place: localDevice;
}
