import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAddressDTO } from 'src/user/dto/create.address.dto';
import { AddressEntity } from 'src/user/entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async createUser(createUser: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      const { name, url, email, phone, password } = createUser;
      try {
        // const address = this.createAddress(createUser.address);
        // this.addressRepository.save(address);

        const user = this.userRepository.create();
        user.name = name;
        user.email = email;
        user.phone = phone;
        if (url) {
          user.url = url;
        }
        user.active = true;
        user.salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, user.salt);
        // user.address = this.createAddress(createUser.address);
        console.log(user);
        const newUser = await this.userRepository.save(user);
        console.log(newUser);
        resolve(newUser);
      } catch (error) {
        console.log('erro service');
        reject(error);
      }
    });
  }

  // createAddress(addressDto: CreateAddressDTO): AddressEntity {
  //   const { city, complement, neighborhood, number, state, street, zipCode } =
  //     addressDto;
  //   const address = this.addressRepository.create();
  //   address.city = city;
  //   address.complement = complement;
  //   address.neighborhood = neighborhood;
  //   address.number = number;
  //   address.state = state;
  //   address.street = street;
  //   address.zipCode = zipCode;
  //   return address;
  // }
}

// const address = this.addressRepository.create();
// const {
//   city,
//   complement,
//   neighborhood,
//   number,
//   state,
//   street,
//   zipCode,
// } = createUser.address;
// address.city = city;
// address.complement = complement;
// address.neighborhood = neighborhood;
// address.number = number;
// address.state = state;
// address.street = street;
// address.zipCode = zipCode;
// const newAddress = this.addressRepository.save(address);
// resolve(newAddress);
