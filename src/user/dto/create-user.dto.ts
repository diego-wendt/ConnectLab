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
<<<<<<< HEAD
import { Match } from '../validators/match.validator';
=======
import { CreateAddressDTO } from './create.address.dto';
>>>>>>> feature/AdressEntity

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

  //   @Column({ default: 'https://publicdomainvectors.org/photos/1389952697.png' })
  @ValidateIf((dto) => dto.url !== '')
  @MinLength(3)
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

  @Match('password', { message: 'Password don not match' })
  password2: string;
}
