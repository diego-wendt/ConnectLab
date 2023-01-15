import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { IdDeviceDto } from '../dto/id-device.dto';
import { PlaceDto } from '../dto/place-dto';
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
    return new Promise(async (resolve, reject) => {
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
        resolve({ message: 'Models has been registered.' });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findModelsRepository() {
    return await this.modelRepository.find();
  }

  async findOneModel(createDeviceDto: CreateDeviceDto): Promise<ModelEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const model = await this.modelRepository.findOne({
          where: { id_model: createDeviceDto.model_id },
        });
        if (!model) {
          reject({
            code: 404,
            detail: 'Model not found.',
          });
        }
        resolve(model);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findAllModels() {
    return new Promise(async (resolve, reject) => {
      try {
        const models = await this.findModelsRepository();
        if (models.length > 1) {
          resolve(models);
        }
        await this.createModels();
        const modelList = await this.findModelsRepository();
        resolve(modelList);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async getPlaces() {
    return { places: localDevice };
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
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async selectFilter(place: localDevice | null, id: string) {
    let filtro = {};
    if (place) {
      filtro = {
        user: { id: id },
        place: parseInt(localDevice[place]),
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

  async pagination(totalDevices, take, skip) {
    const totalPages = Math.ceil(totalDevices / take);
    return { totalDevices, totalPages, take, skip };
  }

  async listUserDevices(payload: PayloadDto, query: PlaceDto) {
    return new Promise(async (resolve, reject) => {
      const { id } = payload;
      const { page, size, place } = query;

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

        const pagination = await this.pagination(devices[1], take, skip);

        resolve({ devices, pagination });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findDevice(
    { id_device }: IdDeviceDto,
    payload: PayloadDto,
    relation?: object,
  ): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.deviceRepository.findOne({
          where: { user: { id: payload.id }, id_device: id_device },
          relations: relation,
        });

        if (!device) {
          reject({
            code: 404,
            detail: 'Device not found.',
          });
        }
        resolve(device);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async switchDevice(id_device: IdDeviceDto, payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findDevice(id_device, payload);
        device.switch_state = !device.switch_state;
        await this.deviceRepository.save(device);
        resolve({ switch_state: device.switch_state });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async deleteDevice(id_device: IdDeviceDto, payload: PayloadDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.findDevice(id_device, payload);
        await this.deviceRepository.delete(device.id_device);

        resolve({ message: 'Device successfully removed.' });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
