import { ApiProperty } from '@nestjs/swagger';
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
import { ApiProperties } from 'src/utils/api.properties';
import { CreateAddressDTO } from './create.address.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.name)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.email)
  email: string;

  @ValidateIf((dto) => dto.url !== '')
  @IsUrl()
  @ApiProperty(ApiProperties.email)
  url: string;

  @ValidateIf((dto) => dto.phone !== '')
  @IsNumberString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty(ApiProperties.phone)
  phone: string;

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  @ApiProperty({
    name: 'address',
    description: 'Endereço',
    example: CreateAddressDTO,
  })
  address: CreateAddressDTO;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty(ApiProperties.password)
  password: string;

  @Match('password', { message: 'Password do not match' })
  @ApiProperty({
    ...ApiProperties.password,
    name: 'password2',
    description: 'Confirmação da senha',
  })
  password2: string;
}
