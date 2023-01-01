/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAddressDTO } from 'src/user/dto/create.address.dto';
import { AddressEntity } from 'src/user/entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { Inject } from '@nestjs/common/decorators';
import { CredentialsDto } from '../dto/credentials.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/user/dto/change_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async createUser(createUser: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      const { name, url, email, phone, password } = createUser;
      try {
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
        user.address = this.createAddress(createUser.address);
        const newUser = await this.userRepository.save(user);
        delete newUser.password;
        delete newUser.salt;
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });
  }

  async signin(credentials: CredentialsDto) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      url: user.url,
      firstname: user.name.split(' ')[0],
    };

    const token = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 10 * 60,
    });
    return token;
  }

  createAddress(addressDto: CreateAddressDTO): AddressEntity {
    const { city, complement, neighborhood, number, state, street, zipCode } =
      addressDto;
    const address = this.addressRepository.create();
    address.city = city;
    address.complement = complement;
    address.neighborhood = neighborhood;
    address.number = number;
    address.state = state;
    address.street = street;
    address.zipCode = zipCode;
    return address;
  }

  async checkCredentials(credentials: CredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
        active: true,
      },
    });
    if (user && user.checkPassword(password)) {
      return user;
    }
    return null;
  }

  async changePassword(changePasswordtDto: ChangePasswordDto) {
    const user = await this.checkCredentials(changePasswordtDto);
    if (user) {
      user.password = bcrypt.hashSync(
        changePasswordtDto.newPassword,
        user.salt,
      );
      const savedUser = await this.userRepository.save(user);
      // delete savedUser.password;
      // delete savedUser.salt;
      return savedUser;
    }
    return 'error';
  }
}
