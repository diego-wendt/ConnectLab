import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Inject } from '@nestjs/common/decorators';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getData(CredentialsDto: CredentialsDto) {
    const { email, password } = CredentialsDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
        active: true,
      },
      relations: { address: true },
    });

    if (user && user.checkPassword(password)) {
      const newUser = new UserEntity();
      newUser.url = user.url;
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.address = user.address;
      delete newUser.address.id;
      if (user.phone) {
        newUser.phone = user.phone;
      }
      return newUser;
    }
    return 'error';
  }
}
