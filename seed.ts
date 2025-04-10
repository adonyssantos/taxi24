/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { INestApplicationContext } from '@nestjs/common';
import { Driver } from './src/drivers/entities/driver.entity';
import { Passenger } from './src/passengers/entities/passenger.entity';
import { Trip } from './src/trips/entities/trip.entity';
import { Repository } from 'typeorm';
import { TripStatus } from 'src/shared/constants/trip-status.enum';

async function bootstrap() {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(AppModule);

  const driverRepo = app.get<Repository<Driver>>(getRepositoryToken(Driver));
  const passengerRepo = app.get<Repository<Passenger>>(
    getRepositoryToken(Passenger),
  );
  const tripRepo = app.get<Repository<Trip>>(getRepositoryToken(Trip));

  await tripRepo.delete({});
  await driverRepo.delete({});
  await passengerRepo.delete({});

  const drivers: Driver[] = [];
  const passengers: Passenger[] = [];

  for (let i = 0; i < 20; i++) {
    const driver = driverRepo.create({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      // @ts-expect-error
      phone: faker.phone.number('+1##########'),
      current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
      current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
      is_available: Math.random() > 0.5,
      created_at: new Date(),
      updated_at: new Date(),
    });
    drivers.push(await driverRepo.save(driver));

    const passenger = passengerRepo.create({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      // @ts-expect-error
      phone: faker.phone.number('+1##########'),
      current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
      current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
      created_at: new Date(),
      updated_at: new Date(),
    });
    passengers.push(await passengerRepo.save(passenger));
  }

  for (let i = 0; i < 20; i++) {
    let driver;
    do {
      driver = faker.helpers.arrayElement(drivers);
      const activeTrip = await tripRepo.findOne({
        where: { driver: { id: driver.id }, status: TripStatus.ACTIVE },
      });
      if (!activeTrip) break;
    } while (true);

    const status =
      Math.random() > 0.5 ? TripStatus.COMPLETED : TripStatus.ACTIVE;
    const completed_at = status === TripStatus.COMPLETED ? new Date() : null;

    const trip = tripRepo.create({
      id: faker.string.uuid(),
      driver,
      passenger: faker.helpers.arrayElement(passengers),
      status,
      start_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
      start_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
      end_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
      end_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
      created_at: new Date(),
      updated_at: new Date(),
      completed_at,
    });

    await tripRepo.save(trip);
  }

  await app.close();
  console.log('Seed completed!');
}

bootstrap();
