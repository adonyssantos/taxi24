import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassengerDriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  findNearby(lat: number, lng: number, limit: number = 3) {
    return this.driverRepository
      .createQueryBuilder('driver')
      .orderBy(
        `
      6371 * 2 * ASIN(SQRT(
      POWER(SIN(RADIANS(driver.current_lat - :lat) / 2), 2) +
      COS(RADIANS(:lat)) * COS(RADIANS(driver.current_lat)) *
      POWER(SIN(RADIANS(driver.current_lng - :lng) / 2), 2)
      ))`,
        'ASC',
      )
      .setParameters({ lat, lng })
      .limit(limit)
      .getMany();
  }
}
