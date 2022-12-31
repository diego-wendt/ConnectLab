import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { DeviceEntity } from '../entities/device.entity';
import { ModelEntity } from '../entities/model.entity';
import { devices } from '../mock/models.mock';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
    @Inject('MODEL_REPOSITORY')
    private modelRepository: Repository<ModelEntity>,
  ) {}

  async createModels() {
    const listDevices = await this.modelRepository.find();
    if (listDevices.length == 0) {
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
    }
    return;
  }

  async create(createDeviceDto: CreateDeviceDto) {
    const device = this.deviceRepository.create();
    device.customName = createDeviceDto.customName;
    const deviceSaved = await this.deviceRepository.save(device);
    return deviceSaved;
  }

  async findAll() {
    return await this.deviceRepository.find();
  }
}
