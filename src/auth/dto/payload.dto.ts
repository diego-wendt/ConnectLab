import { IsEmail, IsString, IsUrl, IsUUID } from 'class-validator';

export class PayloadDto {
  @IsUUID()
  id: string;
  @IsString()
  firstName: string;
  @IsEmail()
  email: string;
  @IsUrl()
  url: string;
}
