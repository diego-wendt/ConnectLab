import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperties } from 'src/utils/api.properties';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.email)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty(ApiProperties.password)
  password: string;
}
