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

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

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

}
