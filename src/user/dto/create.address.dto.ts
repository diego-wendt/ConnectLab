import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(6)
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  complement: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  zipCode: string;
}
