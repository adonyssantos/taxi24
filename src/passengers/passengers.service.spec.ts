import { Test, TestingModule } from '@nestjs/testing';
import { PassengersService } from './passengers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { faker } from '@faker-js/faker';
import { createMockRepository } from 'src/shared/utils/create-mock-repository.util';

describe('PassengersService', () => {
  let service: PassengersService;

  const mockPassenger: Partial<Passenger> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    current_lat: faker.location.latitude({ min: 18.45, max: 18.5 }),
    current_lng: faker.location.longitude({ min: -69.95, max: -69.85 }),
  };

  const mockRepository = createMockRepository<Passenger>(mockPassenger);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengersService,
        {
          provide: getRepositoryToken(Passenger),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PassengersService>(PassengersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a passenger', async () => {
    const dto: CreatePassengerDto = {
      name: mockPassenger.name!,
      email: mockPassenger.email!,
      phone: mockPassenger.phone!,
      current_lat: mockPassenger.current_lat!,
      current_lng: mockPassenger.current_lng!,
    };

    mockRepository.findOneBy.mockResolvedValueOnce(null);
    const result = await service.create(dto);

    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(mockPassenger);
    expect(result).toEqual(mockPassenger);
  });

  it('should return all passengers', async () => {
    mockRepository.find.mockResolvedValue([mockPassenger]);

    const result = await service.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual([mockPassenger]);
  });

  it('should return a passenger by ID', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockPassenger);

    const result = await service.findOne('uuid-123');

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-123' });
    expect(result).toEqual(mockPassenger);
  });
});
