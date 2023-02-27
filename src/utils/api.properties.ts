import { CreateAddressDTO } from 'src/user/dto/create.address.dto';

export const ApiProperties = {
  email: {
    name: 'email',
    description: 'E-mail',
    example: 'fulano@dasilva.com.br',
    maxLength: 50,
  },
  password: {
    name: 'password',
    description: 'Senha',
    example: 'aB1@duje',
    minLength: 8,
  },
  url: {
    name: 'url',
    description: 'Endereço de imagem',
    example:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackinstall.com%2F&psig=AOvVaw3eejhy_2F82rm0xOAogLq2&ust=1676846328653000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjqjsGRoP0CFQAAAAAdAAAAABAH',
  },
  phone: {
    name: 'phone',
    description: 'Número de telefone',
    example: '(12)12345-6789',
  },
  id: {
    name: 'id',
    description: 'Id do usuário',
    example: 'UUID do usuário',
  },
  firstName: {
    name: 'firstName',
    description: 'Primeiro nome do usuário',
    example: 'Fulano',
  },
  name: {
    name: 'name',
    description: 'Nome',
    example: 'Fulano da Silva',
  },
  street: {
    name: 'street',
    description: 'Nome da rua',
    example: 'Rua dos programadores',
    maxLength: 50,
  },
  number: { name: 'number', description: 'Número', example: '25' },
  neighborhood: {
    name: 'neighborhood',
    description: 'Bairro',
    example: 'Bairro',
    maxLength: 50,
  },
  city: {
    name: 'city',
    description: 'Cidade',
    example: 'Florianópolis',
    maxLength: 50,
  },
  state: {
    name: 'state',
    description: 'Sigla do estado',
    example: 'SC',
    maxLength: 2,
    minLength: 2,
  },
  complement: {
    name: 'complement',
    description: 'Complemento do endereço',
    example: 'Apto 103',
  },
  zipCode: {
    name: 'zipCode',
    description: 'CEP',
    example: '88010-000',
    minLength: 8,
    maxLength: 8,
  },
};
