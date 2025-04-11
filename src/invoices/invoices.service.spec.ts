import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { createMockRepository } from 'src/shared/utils/create-mock-repository.util';
import { faker } from '@faker-js/faker';
import { TripStatus } from 'src/shared/constants/trip-status.enum';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let repo: ReturnType<typeof createMockRepository<Invoice>>;

  const mockInvoice: Partial<Invoice> = {
    id: faker.string.uuid(),
    trip: {
      id: faker.string.uuid(),
      driver: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        is_available: false,
        current_lat: faker.location.latitude(),
        current_lng: faker.location.longitude(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      passenger: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        current_lng: faker.location.longitude(),
        current_lat: faker.location.latitude(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      start_lat: faker.location.latitude(),
      start_lng: faker.location.longitude(),
      end_lat: faker.location.latitude(),
      end_lng: faker.location.longitude(),
      status: TripStatus.COMPLETED,
      completed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    amount: 10,
    currency: 'USD',
    issued_at: new Date(),
  };

  beforeEach(async () => {
    repo = createMockRepository<Invoice>(mockInvoice);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all invoices', async () => {
    repo.find.mockResolvedValueOnce([mockInvoice]);
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockInvoice]);
  });
});
