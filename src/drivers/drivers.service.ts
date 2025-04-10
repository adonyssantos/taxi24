import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Errors } from 'src/shared/constants/errors.enum';
import { Messages } from 'src/shared/constants/messages.enum';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepository.create({
      ...createDriverDto,
      is_available: true,
    });
    const saved = await this.driverRepository.save(driver);
    return {
      message: Messages.DRIVER_CREATED_SUCCESSFULLY,
      data: saved,
    };
  }

  findAll() {
    return this.driverRepository.find();
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException(Errors.DRIVER_NOT_FOUND);
    }
    return driver;
  }
}
