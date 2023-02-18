import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, IsUUID } from 'class-validator';

export class PayloadDto {
  @IsUUID()
  @ApiProperty({
    name: 'Id do usuário',
    example: 'UUID do usuário',
  })
  id: string;

  @IsString()
  @ApiProperty({
    name: 'Primeiro nome do usuário',
    example: 'Fulano',
  })
  firstName: string;

  @IsEmail()
  @ApiProperty({ name: 'E-mail', example: 'fulano@dasilva.com.br' })
  email: string;

  @IsUrl()
  @ApiProperty({
    name: 'Endereço de imagem',
    example:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackinstall.com%2F&psig=AOvVaw3eejhy_2F82rm0xOAogLq2&ust=1676846328653000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjqjsGRoP0CFQAAAAAdAAAAABAH',
  })
  url: string;
}
