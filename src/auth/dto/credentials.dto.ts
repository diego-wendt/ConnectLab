import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'E-mail', example: 'fulano@dasilva.com.br' })
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
  @ApiProperty({ name: 'Senha', example: 'aB1@duje' })
  password: string;
}
