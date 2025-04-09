/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PassengersModule (e2e)', () => {
  let app: INestApplication;

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
      .send({
        name: 'Adonys Passenger',
        email: 'passenger@adonys.me',
        phone: '+18090000000',
      })
      .expect(201);

    expect(res.body.message).toBe('Passenger created successfully');
    expect(res.body.data).toHaveProperty('id');
  });

  it('should return all passengers', async () => {
    const res = await request(app.getHttpServer())
      .get('/passengers')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });
});
