import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { Passenger } from '../passengers/entities/passenger.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { TripStatus } from 'src/shared/constants/trip-status.enum';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,

    @InjectRepository(Passenger)
    private readonly passengerRepo: Repository<Passenger>,

    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
  ) {}

  async create(dto: CreateTripDto): Promise<Trip> {
    const passenger = await this.passengerRepo.findOneBy({
      id: dto.passenger_id,
    });
    if (!passenger) throw new NotFoundException('Passenger not found');

    const driver = await this.driverRepo.findOneBy({ id: dto.driver_id });
    if (!driver) throw new NotFoundException('Driver not found');

    if (!driver.is_available) {
      throw new BadRequestException('Driver is not available');
    }

    const activeTrip = await this.tripRepo.findOne({
      where: { driver: { id: dto.driver_id }, status: TripStatus.ACTIVE },
    });
    if (activeTrip) {
      throw new BadRequestException('Driver already has an active trip');
    }

    driver.is_available = false;
    await this.driverRepo.save(driver);

    const trip = this.tripRepo.create({
      ...dto,
      passenger,
      driver,
      status: TripStatus.ACTIVE,
    });

    return this.tripRepo.save(trip);
  }

  findAll(): Promise<Trip[]> {
    return this.tripRepo.find();
  }

  async findByStatus(status?: TripStatus): Promise<Trip[]> {
    if (!status) {
      return this.tripRepo.find();
    }
    return this.tripRepo.find({ where: { status } });
  }

  async complete(id: string): Promise<{ message: string; data: Trip }> {
    const trip = await this.tripRepo.findOne({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');

    trip.status = TripStatus.COMPLETED;
    trip.completed_at = new Date();

    trip.driver.is_available = true;
    await this.driverRepo.save(trip.driver);

    const savedTrip = await this.tripRepo.save(trip);

    return {
      message: 'Trip completed successfully',
      data: savedTrip,
    };
  }
}
