import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepo: Repository<Passenger>,
  ) {}

  async create(dto: CreatePassengerDto) {
    const passenger = this.passengerRepo.create(dto);
    const saved = await this.passengerRepo.save(passenger);
    return {
      message: 'Passenger created successfully',
      data: saved,
    };
  }

  findAll() {
    return this.passengerRepo.find();
  }

  findOne(id: string) {
    return this.passengerRepo.findOneBy({ id });
  }
}
