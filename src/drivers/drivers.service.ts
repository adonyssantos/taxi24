import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Errors } from 'src/shared/constants/errors.enum';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const existing = await this.driverRepository.findOneBy({
      email: createDriverDto.email,
    });

    if (existing) {
      throw new ConflictException(Errors.DRIVER_ALREADY_EXISTS);
    }

    const driver = this.driverRepository.create({
      ...createDriverDto,
      is_available: true,
    });
    return this.driverRepository.save(driver);
  }

  findAll() {
    return this.driverRepository.find();
  }

  findAvailable() {
    return this.driverRepository.find({
      where: { is_available: true },
    });
  }

  /**
   * Retrieves a list of drivers within a specified radius from a given latitude and longitude,
   * ordered by their proximity to the specified location.
   *
   * The formula used to calculate the distance is based on the Haversine formula:
   *
   * ```
   * 6371 * 2 * ASIN(SQRT(
   *   POWER(SIN(RADIANS(driver.current_lat - :lat) / 2), 2) +
   *   COS(RADIANS(:lat)) * COS(RADIANS(driver.current_lat)) *
   *   POWER(SIN(RADIANS(driver.current_lng - :lng) / 2), 2)
   * ))
   * ```
   *
   * - `6371` is the Earth's radius in kilometers.
   * - The formula calculates the great-circle distance between two points on a sphere
   *   given their latitudes and longitudes.
   *
   * Reference: [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
   *
   * @param lat - The latitude of the reference point.
   * @param lng - The longitude of the reference point.
   * @param radius - The radius (in kilometers) within which to search for drivers.
   * @returns A promise that resolves to an array of drivers within the specified radius, ordered by proximity.
   */
  async findInRadius(lat: number, lng: number, radius: number = 3) {
    const drivers = await this.driverRepository
      .createQueryBuilder('driver')
      .where(
        `
        6371 * 2 * ASIN(SQRT(
          POWER(SIN(RADIANS(driver.current_lat - :lat) / 2), 2) +
          COS(RADIANS(:lat)) * COS(RADIANS(driver.current_lat)) *
          POWER(SIN(RADIANS(driver.current_lng - :lng) / 2), 2)
        )) <= :radius
        `,
        { lat, lng, radius },
      )
      .orderBy(
        `
        6371 * 2 * ASIN(SQRT(
          POWER(SIN(RADIANS(driver.current_lat - :lat) / 2), 2) +
          COS(RADIANS(:lat)) * COS(RADIANS(driver.current_lat)) *
          POWER(SIN(RADIANS(driver.current_lng - :lng) / 2), 2)
        ))`,
        'ASC',
      )
      .getMany();

    return drivers;
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException(Errors.DRIVER_NOT_FOUND);
    }
    return driver;
  }
}
