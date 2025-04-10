/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Messages } from 'src/shared/constants/messages.enum';
import { Driver } from 'src/drivers/entities/driver.entity';
import { faker } from '@faker-js/faker/.';

describe('DriversModule (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  const mockDriver: Partial<Driver> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
    current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
    is_available: true,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a driver', async () => {
    const res = await request(app.getHttpServer())
      .post('/drivers')
      .send(mockDriver)
      .expect(201);

    expect(res.body).toHaveProperty(
      'message',
      Messages.DRIVER_CREATED_SUCCESSFULLY,
    );
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    createdId = res.body.data.id;
  });

  it('should return all drivers', async () => {
    const res = await request(app.getHttpServer()).get('/drivers').expect(200);

    expect(res.body).toHaveProperty(
      'message',
      Messages.DRIVERS_RETRIEVED_SUCCESSFULLY,
    );
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('name');
    }
  });

  it('should return one driver by ID', async () => {
    if (!createdId) throw new Error('createdId is undefined');
    const res = await request(app.getHttpServer())
      .get(`/drivers/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', Messages.DRIVER_FOUND_SUCCESS);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.id).toBe(createdId);
  });
});
