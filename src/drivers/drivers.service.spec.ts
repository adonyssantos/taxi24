import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { NotFoundException } from '@nestjs/common';

describe('DriversService', () => {
  let service: DriversService;

  const mockDriver: Driver = {
    id: 'uuid-123',
    name: 'Adonys Driver',
    email: 'contact@adonys.me',
    phone: '+18090000000',
    current_lat: 19.3,
    current_lng: -70.6,
    is_available: true,
  };

  const mockRepo = {
    create: jest.fn().mockReturnValue(mockDriver),
    save: jest.fn().mockResolvedValue(mockDriver),
    find: jest.fn().mockResolvedValue([mockDriver]),
    findOneBy: jest.fn().mockResolvedValue(mockDriver),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a driver', async () => {
    const dto = {
      name: mockDriver.name,
      email: mockDriver.email,
      phone: mockDriver.phone,
      current_lat: mockDriver.current_lat,
      current_lng: mockDriver.current_lng,
    };

    const result = await service.create(dto);

    expect(mockRepo.create).toHaveBeenCalledWith({
      ...dto,
      is_available: true,
    });
    expect(mockRepo.save).toHaveBeenCalledWith(mockDriver);
    expect(result).toEqual({
      message: 'Driver created successfully',
      data: mockDriver,
    });
  });

  it('should return all drivers', async () => {
    const result = await service.findAll();
    expect(mockRepo.find).toHaveBeenCalled();
    expect(result).toEqual([mockDriver]);
  });

  it('should return one driver', async () => {
    const result = await service.findOne(mockDriver.id);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: mockDriver.id });
    expect(result).toEqual(mockDriver);
  });

  it('should throw if driver not found', async () => {
    mockRepo.findOneBy.mockResolvedValueOnce(null);

    await expect(service.findOne('fake-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a driver', async () => {
    const updates = { current_lat: 20.0 };
    const updatedDriver = { ...mockDriver, ...updates };

    mockRepo.save.mockResolvedValueOnce(updatedDriver);

    const result = await service.update(mockDriver.id, updates);

    expect(mockRepo.save).toHaveBeenCalledWith(updatedDriver);
    expect(result).toEqual({
      message: 'Driver updated successfully',
      data: updatedDriver,
    });
  });

  it('should delete a driver', async () => {
    const result = await service.remove(mockDriver.id);

    expect(mockRepo.remove).toHaveBeenCalledWith(mockDriver);
    expect(result).toEqual({
      message: 'Driver removed successfully',
    });
  });
});
