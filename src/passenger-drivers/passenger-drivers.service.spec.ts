/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { createMockRepository } from 'src/shared/utils/create-mock-repository.util';
import { PassengerDriversService } from './passenger-drivers.service';
import { Driver } from 'src/drivers/entities/driver.entity';

describe('PassengerDriversService', () => {
  let service: PassengerDriversService;

  const mockDriver: Partial<Driver> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
    current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
    is_available: true,
  };

  const mockRepository = createMockRepository<Driver>(mockDriver);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerDriversService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PassengerDriversService>(PassengerDriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find nearby drivers', async () => {
    const current_lat = 18.47;
    const current_lng = -69.9;
    const limit = 3;

    mockRepository.createQueryBuilder().getMany.mockResolvedValue([mockDriver]);

    const drivers = await service.findNearby(current_lat, current_lng, limit);

    expect(drivers).toEqual([mockDriver]);
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('driver');
    expect(mockRepository.createQueryBuilder().orderBy).toHaveBeenCalled();
    expect(
      mockRepository.createQueryBuilder().setParameters,
    ).toHaveBeenCalledWith({
      lat: current_lat,
      lng: current_lng,
    });
    expect(mockRepository.createQueryBuilder().limit).toHaveBeenCalledWith(
      limit,
    );
  });
});
