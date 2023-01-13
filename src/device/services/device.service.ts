import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { CustomError } from 'src/core/errors/errors';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { IdDeviceDto } from '../dto/id-device.dto';
import { DeviceEntity } from '../entities/device.entity';
import { ModelEntity } from '../entities/model.entity';
import { localDevice } from '../enum/device.local.enum';
import { devices } from '../mock/models.mock';
import { DeviceUtils } from '../utils/device.utils';

@Injectable()
export class DeviceService {
  constructor(
    private deviceUtils: DeviceUtils,
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
    @Inject('MODEL_REPOSITORY')
    private modelRepository: Repository<ModelEntity>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async createModels() {
    try {
      devices.map(async (device) => {
        const newModel = this.modelRepository.create();
        const { madeBy, name, photoUrl, type, _id } = device;
        newModel.id_model = _id;
        newModel.name = name;
        newModel.madeBy = madeBy;
        newModel.photoUrl = photoUrl;
        newModel.type = type;
        await this.modelRepository.save(newModel);
      });
    } catch (error) {}
  }

  async findModelsRepository() {
    return await this.modelRepository.find();
  }

  async findOneModel(createDeviceDto: CreateDeviceDto) {
    const model = await this.modelRepository.findOne({
      where: { id_model: createDeviceDto.model_id },
    });
    if (!model) {
      throw new CustomError('Model not found', 404);
    }
    return model;
  }

  async findAllModels() {
    try {
      const models = await this.findModelsRepository();
      if (models.length === 0) {
        return models;
      }
      await this.createModels();
      return await this.findModelsRepository();
    } catch (error) {
      throw new CustomError('error', 400);
    }
  }

  async getPlaces() {
    try {
      return { places: localDevice };
    } catch (error) {}
  }

  async create(createDeviceDto: CreateDeviceDto, payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.getUserAndRelation(payload, {
          devices: true,
        });

        const model = await this.findOneModel(createDeviceDto);

        if (user && model) {
          const device = await this.deviceRepository.create();
          device.model = model;
          device.name = createDeviceDto.name;
          device.ip_address = this.deviceUtils.generateIp();
          device.mac_address = this.deviceUtils.generateMacAddress();
          device.signal = this.deviceUtils.generateSignal();
          device.switch_state = false;
          device.place = parseInt(localDevice[createDeviceDto.place]);
          device.virtual_id = this.deviceUtils.generateVirtualId();
          user.addDevice(device);
          await this.userRepository.save(user);
          resolve({ message: 'Device successfully registered.' });
        }

        return 'erro';
      } catch (error) {
        reject({
          code: 400,
          detail: 'Error.',
        });
      }
    });
  }

  async selectFilter(place: string | null, id: string) {
    let filtro = {};
    if (place) {
      filtro = {
        user: { id: id },
        place: parseInt(localDevice[place.toUpperCase()]),
      };
    } else {
      {
        filtro = {
          user: { id: id },
        };
      }
    }
    return filtro;
  }

  async pagination(totalDevices, filtro, take, skip) {
    const totalPages = Math.ceil(totalDevices / take);

    return { totalDevices, totalPages, take, skip };
  }

  async listUserDevices(
    payload: PayloadDto,
    page: string,
    size: string,
    place: string,
  ) {
    const { id } = payload;

    try {
      const skip = parseInt(page) || 0;
      const take = parseInt(size) || 10;
      const filterPlace = place || null;

      const filtro = await this.selectFilter(filterPlace, id);

      const devices = await this.deviceRepository.findAndCount({
        where: filtro,
        relations: { model: true },
        skip: skip,
        take: take,
      });

      const pagination = await this.pagination(devices[1], filtro, take, skip);

      return { devices, pagination };
    } catch (error) {
      throw error;
    }
  }

  async findDevice(
    { id_device }: IdDeviceDto,
    payload: PayloadDto,
    relation?: object,
  ) {
    const device = await this.deviceRepository.findOne({
      where: { user: { id: payload.id }, id_device: id_device },
      relations: relation,
    });

    if (!device) {
      throw new CustomError('Device not found.', 404);
    }
    return device;
  }

  async switchDevice(id_device: IdDeviceDto, payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findDevice(id_device, payload);
        device.switch_state = !device.switch_state;
        await this.deviceRepository.save(device);

        resolve(device);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.message,
        });
      }
    });
  }

  async deleteDevice(id_device: IdDeviceDto, payload: PayloadDto) {
    // console.log(id_device);
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findDevice(id_device, payload);
        console.log(device);
        await this.deviceRepository.delete(device.id_device);

        resolve(device);
      } catch (error) {
        reject({
          code: 400,
          detail: 'Error.',
        });
      }
    });
  }
}
