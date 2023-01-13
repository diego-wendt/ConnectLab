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
  id_device: string;
}
