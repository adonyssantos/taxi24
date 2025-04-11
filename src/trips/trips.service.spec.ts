import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Passenger } from '../passengers/entities/passenger.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { createMockRepository } from 'src/shared/utils/create-mock-repository.util';
import { faker } from '@faker-js/faker';
import { TripStatus } from 'src/shared/constants/trip-status.enum';
import { CreateTripDto } from './dto/create-trip.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TripsService', () => {
  let service: TripsService;
  let tripRepo: ReturnType<typeof createMockRepository<Trip>>;
  let passengerRepo: ReturnType<typeof createMockRepository<Passenger>>;
  let driverRepo: ReturnType<typeof createMockRepository<Driver>>;

  const mockTrip: Partial<Trip> = {
    id: faker.string.uuid(),
    status: TripStatus.ACTIVE,
    created_at: new Date(),
  };

  const mockPassenger: Partial<Passenger> = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    current_lat: 18.48,
    current_lng: -69.9,
  };

  const mockDriver: Partial<Driver> = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    is_available: true,
    current_lat: 18.48,
    current_lng: -69.9,
  };

  beforeEach(async () => {
    tripRepo = createMockRepository<Trip>(mockTrip);
    passengerRepo = createMockRepository<Passenger>(mockPassenger);
    driverRepo = createMockRepository<Driver>(mockDriver);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        { provide: getRepositoryToken(Trip), useValue: tripRepo },
        { provide: getRepositoryToken(Passenger), useValue: passengerRepo },
        { provide: getRepositoryToken(Driver), useValue: driverRepo },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  describe('create', () => {
    it('should create a trip successfully', async () => {
      const dto: CreateTripDto = {
        passenger_id: mockPassenger.id!,
        driver_id: mockDriver.id!,
        end_lat: 18.49,
        end_lng: -69.91,
      };

      passengerRepo.findOne.mockResolvedValueOnce(mockPassenger);
      driverRepo.findOne.mockResolvedValueOnce(mockDriver);
      tripRepo.findOne.mockResolvedValueOnce(null);
      tripRepo.create.mockReturnValue(mockTrip);
      tripRepo.save.mockResolvedValueOnce(mockTrip);

      const result = await service.create(dto);
      expect(result).toEqual(mockTrip);
      expect(driverRepo.save).toHaveBeenCalledWith({
        ...mockDriver,
        is_available: false,
      });
    });

    it('should throw if passenger is not found', async () => {
      passengerRepo.findOne.mockResolvedValueOnce(null);
      driverRepo.findOneBy.mockResolvedValueOnce(null); // <- AÑADE ESTO

      const dto: CreateTripDto = {
        passenger_id: 'missing-passenger',
        driver_id: mockDriver.id!,
        end_lat: 18.49,
        end_lng: -69.91,
      };

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw if driver is unavailable', async () => {
      passengerRepo.findOne.mockResolvedValueOnce(mockPassenger);
      driverRepo.findOne.mockResolvedValueOnce({
        ...mockDriver,
        is_available: false,
      });

      const dto: CreateTripDto = {
        passenger_id: mockPassenger.id!,
        driver_id: mockDriver.id!,
        end_lat: 18.49,
        end_lng: -69.91,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('complete', () => {
    it('should complete a trip and update entities', async () => {
      const tripId = mockTrip.id!;
      const trip = {
        ...mockTrip,
        driver: { ...mockDriver },
        passenger: { ...mockPassenger },
        end_lat: 18.5,
        end_lng: -69.9,
        status: TripStatus.ACTIVE,
      } as Trip;

      tripRepo.findOne.mockResolvedValueOnce(trip);
      tripRepo.save.mockResolvedValueOnce({
        ...trip,
        status: TripStatus.COMPLETED,
      });

      const result = await service.complete(tripId);
      expect(result.status).toBe(TripStatus.COMPLETED);
      expect(tripRepo.save).toHaveBeenCalled();
      expect(driverRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ is_available: true }),
      );
    });

    it('should throw if trip does not exist', async () => {
      tripRepo.findOne.mockResolvedValueOnce(null);
      await expect(service.complete('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if trip is already completed', async () => {
      tripRepo.findOne.mockResolvedValueOnce({
        ...mockTrip,
        status: TripStatus.COMPLETED,
      });

      await expect(service.complete(mockTrip.id!)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
