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
import { CreateAddressDTO } from './create.address.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Nome', example: 'Fulano da Silva' })
  name: string;

  @ValidateIf((dto) => dto.url !== '')
  @IsUrl()
  @ApiProperty({
    name: 'Endereço de imagem',
    example:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackinstall.com%2F&psig=AOvVaw3eejhy_2F82rm0xOAogLq2&ust=1676846328653000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjqjsGRoP0CFQAAAAAdAAAAABAH',
  })
  url: string;

  @ValidateIf((dto) => dto.phone !== '')
  @IsNumberString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty({ name: 'Número de telefone', example: '(12)12345-6789' })
  phone: string;

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  @ApiProperty({ name: 'address', example: CreateAddressDTO })
  address: CreateAddressDTO;
}
