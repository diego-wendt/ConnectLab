import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperties } from 'src/utils/api.properties';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    name: 'street',
    description: 'Nome da rua',
    example: 'Rua dos programadores',
    maxLength: 50,
  })
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(6)
  @ApiProperty(ApiProperties.number)
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.neighborhood)
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.city)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty(ApiProperties.state)
  state: string;

  @ValidateIf((o) => o.complement != '')
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty(ApiProperties.complement)
  complement: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty(ApiProperties.zipCode)
  zipCode: string;
}
