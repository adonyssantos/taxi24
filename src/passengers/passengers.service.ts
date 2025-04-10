import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Errors } from 'src/shared/constants/errors.enum';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepo: Repository<Passenger>,
  ) {}

  async create(dto: CreatePassengerDto) {
    const existing = await this.passengerRepo.findOneBy({
      email: dto.email,
    });

    if (existing) {
      throw new ConflictException(Errors.PASSENGER_ALREADY_EXISTS);
    }

    const passenger = this.passengerRepo.create(dto);
    return this.passengerRepo.save(passenger);
  }

  findAll() {
    return this.passengerRepo.find();
  }

  async findOne(id: string) {
    const passenger = await this.passengerRepo.findOneBy({ id });
    if (!passenger) {
      throw new NotFoundException(Errors.PASSENGER_NOT_FOUND);
    }

    return passenger;
  }
}
