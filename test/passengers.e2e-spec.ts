/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker/.';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { Messages } from 'src/shared/constants/messages.enum';

describe('PassengersModule (e2e)', () => {
  let app: INestApplication;

  const mockPassenger: Partial<Passenger> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
    current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a passenger', async () => {
    const res = await request(app.getHttpServer())
      .post('/passengers')
      .send(mockPassenger);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(
      'message',
      Messages.PASSENGER_CREATED_SUCCESSFULLY,
    );
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
  });

  it('should return all passengers', async () => {
    const res = await request(app.getHttpServer()).get('/passengers');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      'message',
      Messages.PASSENGERS_RETRIEVED_SUCCESSFULLY,
    );
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('name');
    }
  });
});
