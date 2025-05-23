import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateDriverDto } from './dto/create-driver.dto';
import { createMockRepository } from 'src/shared/utils/create-mock-repository.util';

describe('DriversService', () => {
  let service: DriversService;

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
        DriversService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a driver', async () => {
    const dto: CreateDriverDto = {
      name: mockDriver.name!,
      email: mockDriver.email!,
      phone: mockDriver.phone!,
      current_lat: mockDriver.current_lat!,
      current_lng: mockDriver.current_lng!,
    };

    mockRepository.findOneBy.mockResolvedValueOnce(null);
    const result = await service.create(dto);

    expect(mockRepository.create).toHaveBeenCalledWith({
      ...dto,
      is_available: true,
    });
    expect(mockRepository.save).toHaveBeenCalledWith(mockDriver);
    expect(result).toEqual(mockDriver);
  });

  it('should return all drivers', async () => {
    const result = await service.findAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockDriver]);
  });

  it('should return one driver', async () => {
    const result = await service.findOne(mockDriver.id!);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({
      id: mockDriver.id,
    });
    expect(result).toEqual(mockDriver);
  });

  it('should throw if driver not found', async () => {
    mockRepository.findOneBy.mockResolvedValueOnce(null);

    await expect(service.findOne('fake-id')).rejects.toThrow(NotFoundException);
  });
});
