import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

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
      message: 'Conductor creado exitosamente',
      data: saved,
    };
  }

  findAll() {
    return this.driverRepository.find();
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Conductor no encontrado');
    }
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id);
    const updated = Object.assign(driver, updateDriverDto);
    const saved = await this.driverRepository.save(updated);
    return {
      message: 'Conductor actualizado correctamente',
      data: saved,
    };
  }

  async remove(id: string) {
    const driver = await this.findOne(id);
    await this.driverRepository.remove(driver);
    return {
      message: 'Conductor eliminado correctamente',
    };
  }
}
