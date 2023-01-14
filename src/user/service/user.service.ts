import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Inject } from '@nestjs/common/decorators';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CustomError } from 'src/core/errors/errors';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserAndRelation(payload: PayloadDto, relation: Object) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: {
        id: id,
        active: true,
      },
      relations: relation,
    });

    if (!user) {
      throw new CustomError('User not found.', 404);
    }

    return user;
  }

  async getUser(payload: PayloadDto) {
    try {
      const user = await this.getUserAndRelation(payload, { address: true });

      if (user) {
        if (!user.phone) {
          delete user.phone;
        }
        delete user.password;
        delete user.salt;
        return user;
      }
    } catch (error) {
      throw Error;
    }
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
          resolve(user);
        }
        reject({
          code: 404,
          detail: 'Incorrect user or password.',
        });
      } catch (error) {
        reject({
          code: 400,
          detail: 'Error.',
        });
      }
    });
  }

  async deleteUser(payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = payload;
        const user = await this.userRepository.findOne({
          where: {
            id: id,
          },
        });
        if (user) {
          const { affected } = await this.userRepository.delete({
            id: id,
          });
          if (affected == 0)
            resolve({
              code: 200,
              detail: 'No user to remove.',
            });
          resolve({
            code: 204,
            detail: 'Nothing to show.',
          });
        }
        reject({
          code: 400,
          detail: 'Error.',
        });
      } catch (error) {
        reject({
          code: 400,
          detail: 'Error.',
        });
      }
    });
  }
}
