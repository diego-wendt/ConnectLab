import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/core/auth/guards/decorator/match.decorator';
import { NotMatch } from 'src/core/auth/guards/decorator/notMatch.decorator';
import { ApiProperties } from 'src/utils/api.properties';

export class ChangePasswordDto {
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

  @IsNotEmpty()
  @NotMatch('password', {
    message: 'New and old passwords must not be the same.',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({
    ...ApiProperties.password,
    name: 'newPassword',
    description: 'Nova senha',
  })
  newPassword: string;

  @Match('newPassword', { message: 'Password do not match' })
  @ApiProperty({
    ...ApiProperties.password,
    name: 'newPassword2',
    description: 'Confirmação da nova senha',
  })
  newPassword2: string;
}
