/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Messages } from 'src/shared/constants/messages.enum';

describe('PassengerDriversModule (e2e)', () => {
  let app: INestApplication;

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

  it('should find nearby drivers', async () => {
    const current_lat = 18.47;
    const current_lng = -69.9;
    const limit = 3;

    const res = await request(app.getHttpServer())
      .get('/passenger/nearby')
      .query({ current_lat, current_lng, limit });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(Messages.DRIVERS_RETRIEVED_SUCCESSFULLY);
    expect(res.body).toHaveProperty('data');
  });
});
