import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperties } from 'src/utils/api.properties';

export class PayloadDto {
  @IsUUID()
  @ApiProperty(ApiProperties.id)
  id: string;

  @IsString()
  @ApiProperty(ApiProperties.firstName)
  firstName: string;

  @IsEmail()
  @ApiProperty(ApiProperties.email)
  email: string;

  @IsUrl()
  @ApiProperty(ApiProperties.email)
  url: string;
}
