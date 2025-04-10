import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Messages } from 'src/shared/constants/messages.enum';
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
    const saved = await this.passengerRepo.save(passenger);
    return {
      message: Messages.PASSENGER_CREATED_SUCCESSFULLY,
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
