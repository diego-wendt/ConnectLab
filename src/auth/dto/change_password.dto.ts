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

export class ChangePasswordDto {
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
  @ApiProperty({ name: 'Nova senha', example: 'aB1@duje' })
  newPassword: string;

  @Match('newPassword', { message: 'Password do not match' })
  @ApiProperty({ name: 'Confirmação da nova senha', example: 'aB1@duje' })
  newPassword2: string;
}
