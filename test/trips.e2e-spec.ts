/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TripStatus } from 'src/shared/constants/trip-status.enum';

describe('TripsModule (e2e)', () => {
  let app: INestApplication;
  let createdTripId: string;

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

  it('should create a trip', async () => {
    const [passengerRes, driverRes] = await Promise.all([
      request(app.getHttpServer()).get('/passengers'),
      request(app.getHttpServer()).get('/drivers/available'),
    ]);

    const passenger = passengerRes.body.data[0];
    const driver = driverRes.body.data.find((d) => d.is_available);

    const res = await request(app.getHttpServer()).post('/trips').send({
      passenger_id: passenger.id,
      driver_id: driver.id,
      end_lat: 18.48,
      end_lng: -69.91,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    createdTripId = res.body.data.id;
  });

  it('should complete the created trip', async () => {
    const res = await request(app.getHttpServer()).patch(
      `/trips/${createdTripId}/complete`,
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.status).toBe(TripStatus.COMPLETED);
    expect(res.body.data.completed_at).toBeDefined();
  });

  it('should return all trips', async () => {
    const res = await request(app.getHttpServer()).get('/trips');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return trips filtered by status', async () => {
    const res = await request(app.getHttpServer()).get(
      `/trips?status=${TripStatus.COMPLETED}`,
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((trip: any) => {
      expect(trip.status).toBe(TripStatus.COMPLETED);
    });
  });
});
