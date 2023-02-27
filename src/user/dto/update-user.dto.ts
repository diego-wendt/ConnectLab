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
import { ApiProperties } from 'src/utils/api.properties';
import { CreateAddressDTO } from './create.address.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.name)
  name: string;

  @ValidateIf((dto) => dto.url !== '')
  @IsUrl()
  @ApiProperty(ApiProperties.url)
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
}
