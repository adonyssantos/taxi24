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
import { Errors } from 'src/shared/constants/errors.enum';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { haversineDistance, metersToKm } from 'src/shared/utils/geo.util';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,

    @InjectRepository(Passenger)
    private readonly passengerRepo: Repository<Passenger>,

    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async create(dto: CreateTripDto): Promise<Trip> {
    const passenger = await this.passengerRepo.findOneBy({
      id: dto.passenger_id,
    });
    if (!passenger) throw new NotFoundException(Errors.PASSENGER_NOT_FOUND);

    const driver = await this.driverRepo.findOneBy({ id: dto.driver_id });
    if (!driver) throw new NotFoundException(Errors.DRIVER_NOT_FOUND);

    if (!driver.is_available) {
      throw new BadRequestException(Errors.DRIVER_NOT_AVAILABLE);
    }

    const activeTrip = await this.tripRepo.findOne({
      where: { driver: { id: dto.driver_id }, status: TripStatus.ACTIVE },
    });
    if (activeTrip) {
      throw new BadRequestException(Errors.PASSENGER_ALREADY_IN_TRIP);
    }

    driver.is_available = false;
    await this.driverRepo.save(driver);

    const trip = this.tripRepo.create({
      ...dto,
      passenger,
      driver,
      status: TripStatus.ACTIVE,
      start_lat: passenger.current_lat,
      start_lng: passenger.current_lng,
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

  async complete(id: string): Promise<Trip> {
    const trip = await this.tripRepo.findOne({
      where: { id },
      relations: ['driver', 'passenger'],
    });

    if (!trip) throw new NotFoundException(Errors.TRIP_NOT_FOUND);
    if (trip.status === TripStatus.COMPLETED) {
      throw new BadRequestException(Errors.TRIP_ALREADY_COMPLETED);
    }

    // change state to completed
    trip.status = TripStatus.COMPLETED;
    trip.completed_at = new Date();

    // this will change the current position of the driver and passenger to the end position
    const { end_lat, end_lng } = trip;

    trip.driver.current_lat = end_lat;
    trip.driver.current_lng = end_lng;
    trip.driver.is_available = true;

    trip.passenger.current_lat = end_lat;
    trip.passenger.current_lng = end_lng;

    await this.driverRepo.save(trip.driver);
    const updatedTrip = await this.tripRepo.save(trip);

    // generate invoice
    const flare = this.calculateFare(updatedTrip);
    const invoice = this.invoiceRepo.create({
      trip: updatedTrip,
      amount: flare.value,
      currency: flare.currency,
      issued_at: new Date(),
    });

    await this.invoiceRepo.save(invoice);
    return updatedTrip;
  }

  private calculateFare(trip: Trip) {
    const BASE_FARE = 5;
    const DISTANCE_MULTIPLIER = 0.5;
    const distance = haversineDistance(
      trip.start_lat,
      trip.start_lng,
      trip.end_lat,
      trip.end_lng,
    );
    const distanceKm = metersToKm(distance);

    return {
      value: Math.round(BASE_FARE + distanceKm * DISTANCE_MULTIPLIER),
      currency: 'USD',
    };
  }
}
