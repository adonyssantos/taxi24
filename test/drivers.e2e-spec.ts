/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Mock } from 'src/shared/constants/mock.map';
import { Messages } from 'src/shared/constants/messages.enum';

describe('DriversModule (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

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
      .send({
        name: Mock.DRIVER_NAME,
        email: Mock.DRIVER_EMAIL,
        phone: Mock.DRIVER_PHONE,
        current_lat: Mock.DRIVER_CURRENT_LAT,
        current_lng: Mock.DRIVER_CURRENT_LNG,
      })
      .expect(201);

    expect(res.body.message).toBe(Messages.DRIVER_CREATED_SUCCESSFULLY);
    expect(res.body.data).toHaveProperty('id');
    createdId = res.body.data.id;
  });

  it('should return all drivers', async () => {
    const res = await request(app.getHttpServer()).get('/drivers').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
    }
  });

  it('should return one driver by ID', async () => {
    if (!createdId) throw new Error('createdId is undefined');
    const res = await request(app.getHttpServer())
      .get(`/drivers/${createdId}`)
      .expect(200);
    expect(res.body.id).toBe(createdId);
  });
});
