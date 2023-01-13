import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/core/auth/guards/decorator/match.decorator';
import { CreateAddressDTO } from './create.address.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  email: string;

  @ValidateIf((dto) => dto.url !== '')
  @IsUrl()
  url: string;

  @ValidateIf((dto) => dto.phone !== '')
  @IsNumberString()
  @MinLength(10)
  @MaxLength(11)
  phone: string;

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  address: CreateAddressDTO;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @Match('password', { message: 'Password do not match' })
  password2: string;
}
