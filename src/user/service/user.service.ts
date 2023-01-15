import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Inject } from '@nestjs/common/decorators';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserAndRelation(
    payload: PayloadDto,
    relation: Object,
  ): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = payload;
        const user = await this.userRepository.findOne({
          where: {
            id: id,
            active: true,
          },
          relations: relation,
        });

        if (!user) {
          reject({
            code: 404,
            detail: 'User not found.',
          });
        }
        resolve(user);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async getUser(payload: PayloadDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.getUserAndRelation(payload, { address: true });

        if (user) {
          if (!user.phone) {
            delete user.phone;
          }
          delete user.password;
          delete user.salt;
          resolve(user);
        }
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async updateUser(updateUser: UpdateUserDto, payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.getUserAndRelation(payload, { address: true });

        const { name, phone, url, address } = updateUser;
        const {
          city,
          complement,
          neighborhood,
          number,
          state,
          street,
          zipCode,
        } = address;
        if (user) {
          user.name = name;
          user.phone = phone;
          user.url = url;
          user.address.city = city;
          user.address.complement = complement;
          user.address.neighborhood = neighborhood;
          user.address.number = number;
          user.address.state = state;
          user.address.street = street;
          user.address.zipCode = zipCode;
          this.userRepository.save(user);

          delete user.password;
          delete user.salt;
          resolve({ message: 'User successfully updated.' });
        }
      } catch (error) {
        reject({
          code: error.status,
          detail: error.response.message,
        });
      }
    });
  }

  async deleteUser(payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = payload;
        const { affected } = await this.userRepository.delete({
          id: id,
        });
        if (affected === 0) {
          reject({
            code: 404,
            detail: 'User not found or unable to remove.',
          });
        }
        resolve({ message: 'User sucefully removed.' });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
