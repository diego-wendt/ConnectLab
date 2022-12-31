import { IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  customName: string;
}
