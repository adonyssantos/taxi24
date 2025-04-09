/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreatePassengerDto } from '../src/passengers/dto/create-passenger.dto';

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
    const dto: CreatePassengerDto = {
      name: 'Adonys Santos',
      email: 'adonys@test.com',
      phone: '8090000000',
    };

    const response = await request(app.getHttpServer())
      .post('/passengers')
      .send(dto)
      .expect(201);

    expect(response.body).toHaveProperty(
      'message',
      'Pasajero creado exitosamente',
    );
    expect(response.body.data).toMatchObject(dto);
    expect(response.body.data).toHaveProperty('id');
  });

  it('should return all passengers', async () => {
    const response = await request(app.getHttpServer())
      .get('/passengers')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('name');
  });
});
