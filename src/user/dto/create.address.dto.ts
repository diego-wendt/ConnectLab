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

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Nome da rua', example: 'Rua dos programadores' })
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(6)
  @ApiProperty({ name: 'Número', example: '25' })
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Bairro', example: 'Bairro' })
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Cidade', example: 'Florianópolis' })
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty({ name: 'Sigla do estado', example: 'SC' })
  state: string;

  @ValidateIf((o) => o.complement != '')
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Complemento do endereço', example: 'Apto 103' })
  complement: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({ name: 'CEP', example: '88010-000' })
  zipCode: string;
}
