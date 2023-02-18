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
import { CreateAddressDTO } from './create.address.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'Nome', example: 'Fulano da Silva' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ name: 'E-mail', example: 'fulano@dasilva.com.br' })
  email: string;

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

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({ name: 'Senha', example: 'aB1@duje' })
  password: string;

  @Match('password', { message: 'Password do not match' })
  @ApiProperty({ name: 'Confirmação de senha', example: 'aB1@duje' })
  password2: string;
}
