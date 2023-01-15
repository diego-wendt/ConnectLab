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
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/auth/dto/change_password.dto';
import { PayloadDto } from '../dto/payload.dto';

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
      try {
        const { name, url, email, phone, password } = createUser;
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
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async signin(credentials: CredentialsDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(credentials);
        if (!user) {
          reject({
            code: 403,
            detail: 'Incorrect user or password.',
          });
        }

        const jwtPayload = {
          id: user.id,
          email: user.email,
          url: user.url,
          firstName: user.name.split(' ')[0],
        };

        const token = this.jwtService.sign(jwtPayload, {
          secret: process.env.JWT_SECRET,
          expiresIn: 100 * 60,
        });
        resolve(token);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
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

  async changePassword(
    changePasswordtDto: ChangePasswordDto,
    payload: PayloadDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { password, newPassword, email } = changePasswordtDto;

        if (payload.email !== email) {
          reject({
            code: 409,
            detail: 'Insert a correct e-mail.',
          });
        }

        const credentials = { email, password };

        const user = await this.checkCredentials(credentials);
        if (user) {
          user.password = bcrypt.hashSync(newPassword, user.salt);
          const savedUser = await this.userRepository.save(user);
          resolve({ message: 'Your password has been successfully changed.' });
        }
        reject({
          code: 403,
          detail: 'Invalid user or password.',
        });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.jwtService.verifyAsync(jwtToken, {
          ignoreExpiration: false,
        });
        resolve(token);
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }
}
