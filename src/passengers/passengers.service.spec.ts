import { Test, TestingModule } from '@nestjs/testing';
import { PassengersService } from './passengers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';

class MockPassengerRepository {
  create = jest.fn();
  save = jest.fn();
  find = jest.fn();
  findOneBy = jest.fn();
}

describe('PassengersService', () => {
  let service: PassengersService;
  let repository: MockPassengerRepository;

  const mockPassenger = {
    id: 'uuid-123',
    name: 'Adonys Passenger',
    email: 'passenger@adonys.me',
    phone: '+18090000000',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengersService,
        {
          provide: getRepositoryToken(Passenger),
          useClass: MockPassengerRepository,
        },
      ],
    }).compile();

    service = module.get<PassengersService>(PassengersService);
    repository = module.get(getRepositoryToken(Passenger));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a passenger and return success message', async () => {
    const dto: CreatePassengerDto = {
      name: 'Adonys Passenger',
      email: 'passenger@adonys.me',
      phone: '+18090000000',
    };

    repository.create.mockReturnValue(mockPassenger);
    repository.save.mockResolvedValue(mockPassenger);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(mockPassenger);
    expect(result).toEqual({
      message: 'Passenger created successfully',
      data: mockPassenger,
    });
  });

  it('should return all passengers', async () => {
    repository.find.mockResolvedValue([mockPassenger]);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockPassenger]);
  });

  it('should return a passenger by ID', async () => {
    repository.findOneBy.mockResolvedValue(mockPassenger);

    const result = await service.findOne('uuid-123');

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-123' });
    expect(result).toEqual(mockPassenger);
  });
});
